import React,{useEffect, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";


function Dashboard() {
  let history = useHistory();
  const [questList,setQuestList] = useState([0,1,2,3,4,5,6,7,8,9])
  const [username,setUsername] = useState("")
  const [rank,setRank] = useState(0)
  const [progress,setProgress] = useState(0)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setUsername(user.email);
        firebase.database().ref('Users').child(user.uid).child('thebountyhunt').child('rank').on('value',snap=>{
          if(snap.val()) setRank(snap.val());
          else setRank(0);
        })
        firebase.database().ref('Users').child(user.uid).child('thebountyhunt').child('currLevel').on('value',snap=>{
          if(snap.val()){
            setProgress(parseInt((parseInt(snap.val())/10)*100))
          }
          else  setProgress(0)
        })
      } else {
        // No user is signed in.
        setUsername("");
        setRank(0);
      }
    });
    
  },[])

  return (
    <div className="limiter">
		<div className="container-login100 " style={{alignItems: "unset"}}>
			<div className="mainCard container">
                <div className="row">
                    <div className="col-lg-4  col-sm-12 col-xs-12">
                        <div className="user-data-card">
                            <h3 style={{textAlign: "center"}}>{username}</h3>
                            <div className="bar_container">
                                <div id="main_container">
                                <div id="pbar" className="progress-pie-chart" data-percent="0">
                                <div className="ppc-progress">
                                <div className="ppc-progress-fill"></div>
                                </div>
                                <div className="ppc-percents">
                                <div className="pcc-percents-wrapper">
                                <span>10%</span>
                                </div>
                                </div>
                                </div>
                                
                                <progress style={{display: "none"}} id="progress_bar" value="0" max={progress}></progress>
                                {console.log(progress)}
                                </div>
                            </div>
                        </div>
                        <div className="user-data-card">
                            <h3>Rank : {rank}</h3>
                        </div>
                        
                    </div>
                    <div className="col-lg-8 col-sm-12 col-xs-12">
                    {questList.length !== 0 ? questList.map(val=>(
                      <div className="dash_list_main"><div className="list-sub">Level 1 - Some text</div><div className="list-sub-end"><span className="list-end-mark">&#10004;</span></div></div>
                    )):<h1>No Quests</h1>}
                        <div className="dash_list_main"><div className="list-sub">Level 1 - Some text</div><div className="list-sub-end"><span className="list-end-mark">&#10004;</span></div></div>
                        <div className="dash_list_main"><div className="list-sub">Level 1 - </div><div className="list-sub-end"><span className="list-end-cross">&#10006;</span></div></div>
                        <div className="dash_list_main"><div className="list-sub">Level 1 - </div><div className="list-sub-end"><span className="list-end-mark">&#10004;</span></div></div>
                    </div>
                </div>


			</div>
		</div>
	</div>
  );
}
export default Dashboard;