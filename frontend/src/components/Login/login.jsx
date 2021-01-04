import React from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";


function Login() {
  let history = useHistory();

  function loggin(target){
	  target.preventDefault();
	let email= document.getElementById('userEmail').value;
	let password = document.getElementById('userpass').value;
	let persistance = firebase.auth.Auth.Persistence.LOCAL;
	firebase
	.auth()
	.setPersistence(persistance)
	.then(() => {
		console.log("logged in")
	   firebase.auth()
		.signInWithEmailAndPassword(email, password)
		.then((cred) => {
			localStorage.setItem("user", "true");
			console.log(cred.user.uid)
			firebase.database().ref("Users").once('value',snap=>{
				console.log(snap.val())
			})
			firebase.database().ref("Users").child(cred.user.uid).once('value',snap=>{
				if(snap.val() ){
					if(snap.val().frombounty && snap.val().frombounty === false){
						var setup = firebase.functions().httpsCallable('setupUserForTheBountyHuntFromMitConsole');
						setup({uid:cred.user.uid}).then(val=>{
							history.push("/dashboard");
						})
					}
					else{
						var setup = firebase.functions().httpsCallable('setupUserForTheBountyHuntFromMitConsole');
						setup({uid:cred.user.uid}).then(val=>{
							history.push("/dashboard");
						})
					}

				}
			})

			
		})
		.catch(function (error) {
		  // Handle Errors here.
		  const errorCode = error.code;
		//   const errorMessage = error.message;

		  console.log(error);
		  if (errorCode === "auth/user-not-found") {
			alert("User Doesn't exists");
		  } else if (errorCode === "auth/wrong-password") {
			alert("Wrong Password")
		  }
		  console.log(error);
		  // [END_EXCLUDE]
		});
	})
	.catch(function (error) {
	  console.log("Firebase Persistance Error:  ", error);
	});
  }

  return (
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG" />
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Member Login
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input id="userEmail" className="input100" type="text" name="email" placeholder="Email" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input id="userpass" className="input100" type="password" name="pass" placeholder="Password" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<a href="dashboard.html">
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={loggin}>
							Login
						</button>
					</div>
				</a>

					<div className="text-center p-t-136">
						<Link className="txt2" to="/register">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
  );
}
export default Login;
