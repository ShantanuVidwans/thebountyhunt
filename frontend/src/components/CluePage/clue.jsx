import React,{useState,useEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";
import "./clue.css";


function Clue() {
  let history = useHistory();
  const [showClue, setShowClue] = useState(false);
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState({});



  useEffect(()=>{
  },[])


  let object = {
    code: "1",
    alert:"Hello",
    data: { ques: ["There are", "mangos and", "apples"], num: ["23", "15"] }
  };
  function showClueFunc() {
    setShowClue(true);
  }


  function userChangeFunc(e) {
    const user = e.target.value;
    setUsername(user);
  }
  function ansChangeFunc(e) {
    const ans = e.target.value;
    setAnswer(ans);
  }


  function callAPI() {
    var getClue = firebase.functions().httpsCallable('getClue');
    getClue({ 
      username:username,
      answer:answer,
      uid:firebase.auth().currentUser.uid
    })
    .then((result) => {
      var sanitizedMessage = result.data;
      console.log(sanitizedMessage)
      if (sanitizedMessage.code === "1") {
        const { ques, num } = sanitizedMessage.data;
        let newQuestion = "";
        ques.forEach((item, index) => {
          newQuestion = newQuestion + " " + item;
          if (num[index]) {
            newQuestion = newQuestion + " " + num[index];
          }
        });
        setQuestion({
          ques: newQuestion
        });
        showClueFunc();
      } 
      else {
        alert(sanitizedMessage.alert);
      }
      var sanitizedMessage = result.data.text;
      console.log(result.data)
    });
  }



  function submitAnsFunc(e) {
    e.preventDefault();
    console.log(answer);
    callAPI();
  }

  return (
    <div className="limiter">
      <div className="container-login100 " style={{ alignItems: "unset" }}>
        <div
          className="mainCard container"
          style={{ width: "90vw", marginTop: "2%" }}
        >
          <div className="row">
            {showClue ? (
              <div style={{ textAlign: "center", margin: "auto " }}>
                <h1 style={{ textAlign: "center", margin: "auto " }}>
                  Your next Quest
                </h1>
                <br />
                <br />
                <p>{question.ques}</p>
                <p>
                  There are some highly used hashing algorithms like MD5. Though
                  not used for security purpose but most commponly used to
                  verify file integrity. Write this text - "random text" and
                  find its MD5 sums.
                </p>
                <br />
                <br />
                <p>
                  Hint - Some questions have an answer right in them. Solve the
                  question.
                </p>
                <br />
                <br />
                <p>
                  Dev Solution - The actuall MD5 would be of the whole question
                  itself. Not juts the text.
                </p>
              </div>
            ) : (
              <div className="col-lg-12" style={{ textAlign: "center" }}>
                <h2 style={{ margin: "20px" }}>
                  Found a Clue?
                </h2>
                <h4 style={{ margin: "20px" }}>Enter your username/email and answer to proceed.</h4>
                <form
                  className="login100-form validate-form"
                  style={{ marginTop: "60px" }}
                >
                  <span className="login100-form-title">Log me on</span>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Valid email is required: ex@abc.xyz"
                  >
                  <input 
                      className="input100"
                      type="text"
                      placeholder="Username"
                      onChange={userChangeFunc}
                      value={username}
                    />
                  <input style={{marginTop:"20px"}}
                      className="input100"
                      type="text"
                      placeholder="Answer"
                      onChange={ansChangeFunc}
                      value={answer}
                    />

                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="container-login100-form-btn">
                    <button
                      className="login100-form-btn"
                      onClick={submitAnsFunc}
                    >
                      Energize
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Clue;