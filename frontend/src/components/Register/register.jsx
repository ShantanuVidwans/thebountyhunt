import React from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";


function Register() {
  let history = useHistory();
  function registerUser(target){
	  target.preventDefault();
	let email= document.getElementById('userEmail').value;
	let password = document.getElementById('userpass').value;
	const passwordvalidate = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!\]\-@(){}_+/\<>.,?":';|~`=[#$%^&*])(?=.{8,})/;
	let confirmPassword = document.getElementById("confirmuserpass").value;
// 	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
// 	password === confirmPassword &&
// 	password.match(passwordvalidate)
//   ) 
if(true)
  {
	firebase
	.auth()
	.createUserWithEmailAndPassword(email, password)
	.then((cred) => {
		console.log(cred)
	  history.push("/login");
	})
	.catch(function (error) {
	  // Handle Errors here.
	  // var errorCode = error.code;
	  var errorMessage = error.message;
	  // abcd = error.message;
	  console.log(error);
	  // setShowAlert(true);

	  if (error.code === "auth/email-already-in-use") {
		alert("Email-already-in-use");
	  } else {
		alert(errorMessage);
	  }
	});
  }

  else {
	// eslint-disable-next-line
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	  alert("Enter a valid Email");
	} else if (!(password === confirmPassword)) {
	  alert("Password do not match");
	} else if (!password.match(passwordvalidate)) {
	  alert(
		"Enter a Strong Password. A password must contain a numeric character and atleast one special character and a Upper Case letter"
	  );
	} else console.log("Ex Register error");
  }

  }

  return (
<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">

				<div className="login100-form validate-form">
					<span className="login100-form-title">
						Register
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz" >

						<input id="userEmail" className="input100" type="text" name="email" placeholder="Email" />

						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required" >

						<input id="userpass" className="input100" type="password" name="pass" placeholder="Password" />

						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					
					<div className="wrap-input100 validate-input" data-validate = "Confirmation is required">
						<input id="confirmuserpass" className="input100" type="password" name="pass" placeholder="Confirm Password" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={registerUser}>
							Register
						</button>
					</div>

					<div className="text-center p-t-136">
						<a className="txt2" href="index.html">
							Already have an account. Login
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
}
export default Register;