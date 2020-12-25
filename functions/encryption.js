const crypto = require("crypto");

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

const username = "username"; // get from user
// const user = get from db by username

// if(requestedLevel > user.level-1) {
//     res.send("Error! Clear loer levels first");
// } else if(requestedLevel < user.level-1) {
//     res.send("You have already cleared this level");
// } else {
//     proceed to code written below
// }

const hash = mixedHash(username); // normal md5 hash
const numHash = numberHash(username); // replace all letters with ascii val
const charHash = characterHash(username); // replace all numbers with corresponding letter in alphabet

// console.log(hash);
console.log(numHash);
// console.log(charHash);

// check if hash matched from db then procedd below

// use whatever hash required
// console.log(retrieveNumbers([4, 3], hash));
const numsArray = retrieveNumbers([4, 3], numHash); // retrieve sums numbers from the hash
console.log(numsArray);
// console.log(retrieveNumbers([4, 3], charHash));

//final json to return
// const obj = {
//     questionArray,
//     numsArray,
//     user.level
// };

// return obj;
