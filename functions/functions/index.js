const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require("crypto");
const { join } = require('path');
const cors = require('cors')({origin: true});

var firebaseConfig = {
    apiKey: "AIzaSyA7lecxGdSzYZyq7JJWTuce7IQFIeHNAhA",
    authDomain: "mit-wpu-student-console.firebaseapp.com",
    databaseURL: "https://mit-wpu-student-console.firebaseio.com",
    projectId: "mit-wpu-student-console",
    storageBucket: "mit-wpu-student-console.appspot.com",
    messagingSenderId: "66181943192",
    appId: "1:66181943192:web:dfbe4f6eeca82613f7e5ed"
  };
  admin.initializeApp(firebaseConfig);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const mixedHash = (username) => {
    const hash = crypto.createHash("md5").update(username).digest("hex");
    return hash;
};

const numberHash = (username) => {
    const hash = mixedHash(username);
    let numHash = "";

    [...hash].forEach((ch) => {
        if (ch >= "0" && ch <= "9") {
            numHash += ch;
        } else {
            numHash += ch.charCodeAt(0); // converting letters to ascii values
        }
    });
    return numHash;
};

const characterHash = (username) => {
    const hash = mixedHash(username);
    let charHash = "";

    [...hash].forEach((ch) => {
        if (ch >= "a" && ch <= "z") {
            charHash += ch;
        } else {
            charHash += String.fromCharCode(97 + parseInt(ch)); // converting the single digit to correspodning letter; 0=a, 1=b etc
        }
    });
    return charHash;
};

const retrieveNumbers = (arr, hash) => {
    let ans = [],
        start = 0,
        count;

    for (let i = 0; i < arr.length; i++) {
        count = arr[i];
        ans.push(hash.slice(start, start + count));
        start += count;
    }
    return ans;
};

exports.setupUserForTheBountyHunt = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        functions.logger.info("Hello logs!", {structuredData: true});
        const uid = request.body.data.uid;
        admin.database().ref('Users').child(uid).update({
            frombounty:true,
            credit_points:50,
            thebountyhunt:{
                currLevel:1,
                ques:{
                    "1":{
                        ans:'123',
                    }
                }
            }
        })

        response.send({data:{
            code: "1",
            data: "Successful"
          }});

        //Type of question : 0-> Uses number hash 1-> uses string hash 2-> uses mixed hash 3-> no hash
    })
});


exports.setupUserForTheBountyHuntFromMitConsole = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        functions.logger.info("Hello logs!", {structuredData: true});
        const uid = "033gCniiYUPDCjff1o916T7YBqQ";
        // const uid = request.body.data.uid;
        admin.database().ref('Users').child(uid).update({
            thebountyhunt:{
                currLevel:1,
                ques:{
                    "1":{
                        ans:'123',
                    }
                }
            }
        })

        response.send({data:{
            code: "1",
            data: "Successful"
          }});

        //Type of question : 0-> Uses number hash 1-> uses string hash 2-> uses mixed hash 3-> no hash
    })
});




exports.getClue = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        functions.logger.info("Hello logs!", {structuredData: true});
        const username = request.body.data.username;
        const answer  = request.body.data.answer;
        const uid = request.body.data.uid;
        console.log(uid)
        let userBountyHunt = admin.database().ref('Users').child(uid).child('thebountyhunt');
        let bountyLeaders = admin.database().ref('thebountyhunt').child('leaderboards');
        let bountyQuestions  = admin.database().ref('thebountyhunt').child('questions');
        //Fetch user data
        if(username !== null && username !== "" && answer !== null && answer !== "" && uid !== null && uid !== ""){
            userBountyHunt.once('value',snap=>{
                if(snap.val()){
                    let currUserLevel = snap.val().currLevel
                    let realAnswer = snap.val().ques[currUserLevel.toString()].ans
                    if(currUserLevel !== null && realAnswer !== null){
                        if(realAnswer !== answer){
                            response.send({data:{
                                code: "0",
                                alert:"Wrong Answer! Keep Trying (Answers are verified against current problem)",
                              }});
                        }
                        else{
                            bountyQuestions.once('value',snap=>{
                                if(snap.val()[(currUserLevel+1).toString()]){
                                    response.send({data:{
                                        code: "1",
                                        data:snap.val()[(currUserLevel+1).toString()]
                                      }});
                                      userBountyHunt.once('value',asnap=>{
                                        userBountyHunt.update({
                                              currLevel: asnap.val().currLevel + 1
                                          })
                                      })
                                }
                            }).then(()=>{
                                //Code for generating leaderboards
                                bountyLeaders.child(uid).child('rank').once('value',snap=>{
                                    bountyLeaders.child(uid).update({
                                        rank: snap.val()? snap.val() + 50:50,
                                        name: username
                                    })
                                })
                                bountyLeaders.once("value",snap=>{
                                    snap.forEach(csnap=>{
                                        console.log(Object.entries(csnap))
                                    })
                                })
                                return null;
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        }
                    }
                    else{
                        response.send({data:{
                            code: "0",
                            alert:"User not logged in/ not resistered",
                          }});
                    }
                }
                else{
                    response.send({data:{
                        code: "0",
                        alert:"User not logged in/ not resistered",
                      }});
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            response.send({data:{
                code: "0",
                alert:"Input Error! Check your input username and answer",
            }});
        }

        // response.send({data:{
        //     code: "1",
        //     alert:"Hello",
        //     data: { ques: ["There are", "mangos and", "apples"], num: ["23", "15"] }
        //   }});

        //Type of question : 0-> Uses number hash 1-> uses string hash 2-> uses mixed hash 3-> no hash
    })
});
