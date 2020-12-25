import React from "react";
import "./styles.css";

//TODO: Below is a code for a timer template. Place this file as App.jsx and run(start) the react app.
//The timer should be a contdown to the 25th od december form present time.
//Timer is is in day hour minute seconds.
//I should be able to cange the countdown end date by just one separate variable.
//Keep code modular such that i can add this directly
//Do not create new modules and not allowed to use any new libraries.
//To simplify stuff, use codesandbox to create it.



export default function App() {

  return (<div id="page-top" className="main-home">
    {/* Timer */}
    <section id="explore">
      <div class="container">
        <div class="row">
          <div class="watch">
            <img class="img-responsive" src="images/watch.png" alt="" />
          </div>				
          <div class="col-lg-6 col-md-4 col-md-offset-2 col-sm-5">
            
          </div>				
          <div class="col-lg-4 col-sm-7 col-md-6">			
          <h2 class="timer-text-1" style={{marginBottom:"20px"}}>Event Starts in</h2>		
            <ul id="countdown">
              <li>					
                <span class="days time-font">00</span>
                <p class="timer-text">days </p>
              </li>
              <li>
                <span class="hours time-font">00</span>
                <p class="timer-text">hours </p>
              </li>
              <li>
                <span class="minutes time-font">00</span>
                <p class="timer-text">minutes</p>
              </li>
              <li>
                <span class="seconds time-font">00</span>
                <p class="timer-text">seconds</p>
              </li>				
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>

  );
}