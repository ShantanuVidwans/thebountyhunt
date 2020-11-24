import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";


function Leaderboard() {
  let history = useHistory();
  const [leaderList,setLeaderList] = useState([1,2,3,4])

  return (
    <div className="limiter">
		<div className="container-login100 " style={{alignItems: "unset"}}>
			<div className="mainCard container" style={{width:"90vw",marginTop: "2%"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 style={{textAlign: "center",marginTop: "20px",marginBottom:"50px"}}>Leaderboards</h1>
                        {leaderList.length !== 0 ? leaderList.map(val=>(<div className="lead_list_main">
                            <div className="lead-list-rank">1</div>
                            <div className="lead-list-user">myusername347978
                            </div>
                            <div className="lead-list-points">400
                            </div>
                        </div>)):<h1>No players</h1>}
                    </div>
                </div>


			</div>
		</div>
	</div>
  );
}
export default Leaderboard;