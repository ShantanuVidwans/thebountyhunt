import React,{useEffect, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";


function Navbar() {
  let history = useHistory();
  const [userAuthState,setUserAuthState] = useState(false)
  useEffect(() => {
    console.info("Firebase request generated");
    // if(firebase.auth().currentUser) setUserAuthState(true);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.uid)
        // localStorage.setItem("user", "true");
        // window.location = "/dashboard"
        setUserAuthState(true);
      } else {
        // No user is signed in.
        // localStorage.setItem("user", "false");
        setUserAuthState(false);
      }
    });
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <Link className="navbar-brand" to="/dashboard">
          <img src="https://s3.amazonaws.com/codechef_shared/sites/all/themes/abessive/logo.svg" width="70" height="30" className="d-inline-block align-top" alt="" />
        </Link> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto" style={{marginRight: "2%"}}>
          <li className="nav-item active">
            <Link className="nav-link" to="/home">Home <span class="sr-only">(current)</span></Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link" to="/leaderboards">LeaderBoards</Link>
          </li>
        {userAuthState?<><li className="nav-item active">
            <Link className="nav-link" to="/dashboard">Dashboard <span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item">
              <div class="nav-link" style={{cursor:"pointer"}} onClick={()=>{
                firebase.auth().signOut();
                localStorage.setItem("user","false")
                history.push("/login");
              }}>SignOut</div>
            </li></>:null}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;