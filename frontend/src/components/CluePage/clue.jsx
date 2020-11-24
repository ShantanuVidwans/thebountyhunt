import React from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";


function Clue() {
  let history = useHistory();

  return (
    <div className="limiter">
		<div className="container-login100 " style={{alignItems: "unset"}}>
			<div className="mainCard container" style={{width:"90vw",marginTop: "2%"}}>
                <div className="row">
                    <div className="col-lg-12" style={{textAlign: "center"}}>
                        <h2 style={{margin:"20px"}}>Congratulations! Looks like you found a clue.</h2>
                        <h4 style={{margin:"20px"}}>Enter your email to proceed.</h4>
                        <form className="login100-form validate-form" style={{marginTop:"60px"}}>
                            <span className="login100-form-title">
                                Log me on
                            </span>
        
                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Username" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Energize
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


			</div>
		</div>
	</div>
  );
}
export default Clue;