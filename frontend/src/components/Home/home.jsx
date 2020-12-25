import React,{useEffect, useState} from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useHistory, Link } from "react-router-dom";
import firebase from "../firebase";
import "./home.css";

function Home() {
  let history = useHistory();

  let end = "Dec 25, 2020 15:00:00";
  const endDate = new Date(end).getTime();
  const [time, setTime] = useState({
    day: "00",
    hour: "00",
    minute: "00",
    second: "00"
  });
  setInterval(updateCounter, 1000);
  function updateCounter() {
    const now = new Date().getTime();
    const remainingTime = endDate - now;
    setTime({
      day: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
      hour: Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minute: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
      second: Math.floor((remainingTime % (1000 * 60)) / 1000)
    });
  }

  return (<div id="page-top" className="main-home">
    <header class="masthead">
      <div class="container d-flex h-100 align-items-center">
        <div class="mx-auto text-center">
          <h1 class="mx-auto my-0" >The Bounty Hunt</h1>
          <h2 class="text-white-50 mx-auto mt-2 mb-5">By CodersEra</h2>
          <Link href="#about" class="btn btn-primary js-scroll-trigger" to="/login">Get Started</Link>

          <div class="sponscont align-items-center">
                  <div id="p2"><img class="spons" src="images/cblock.png" /></div>
                  <div id="p3"><img class="spons" src="images/inator.png" /></div>
                  <div id="p1"><img class="spons" src="images/codechef.png" /></div>
                  <div id="p4"><img class="spons" src="images/mozilla.png" /></div>
                  <div id="p5"><img class="spons" src="images/cric.png" /></div>
          </div>
      </div>
      </div>
    </header>




    {/* Timer */}
    <section id="explore">
        <div className="container">
          <div className="row">
            <div className="watch">
              <img className="img-responsive" src="images/watch.png" alt="" />
            </div>
            <div className="col-lg-6 col-md-4 col-md-offset-2 col-sm-5"></div>
            <div className="col-lg-4 col-sm-7 col-md-6">
              <h2 className="timer-text-1" style={{ marginBottom: "20px" }}>
                Event Starts in
              </h2>
              <ul id="countdown">
                <li>
                  <span className="days time-font">{time.day}</span>
                  <p className="timer-text">days </p>
                </li>
                <li>
                  <span className="hours time-font">{time.hour}</span>
                  <p className="timer-text">hours </p>
                </li>
                <li>
                  <span className="minutes time-font">{time.minute}</span>
                  <p className="timer-text">minutes</p>
                </li>
                <li>
                  <span className="seconds time-font">{time.second}</span>
                  <p className="timer-text">seconds</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

{/* Sponsors */}
<section id="sponsor">
			<div class="container" >
				<div class="row">
					<div class="col-sm-10" style={{margin:"auto"}}>
						<h2 style={{color:"white",textAlign:"center"}}>Sponsors</h2>			
						<a class="sponsor-control-left" href="#sponsor-carousel" data-slide="prev"><i class="fa fa-angle-left"></i></a>
						<a class="sponsor-control-right" href="#sponsor-carousel" data-slide="next"><i class="fa fa-angle-right"></i></a>
						<div class="carousel-inner">
							<div class="item active">
								<ul>
									<li><a href="#"><img class="img-responsive spons2" src="images/cblock.png" alt="" /></a></li>
									<li><a href="#"><img class="img-responsive spons2" src="images/inator.png" alt="" /></a></li>
									<li><a href="#"><img class="img-responsive spons2" src="images/codechef.png" alt="" /></a></li>
									<li><a href="#"><img class="img-responsive spons2" src="images/mozilla.png" alt="" /></a></li>
									<li><a href="#"><img class="img-responsive spons2" src="images/cric.png" alt="" /></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>				
			</div>
			<div class="light">
				<img class="img-responsive" src="images/light.png" alt="" />
			</div>
	</section>


  {/* <!-- Contact Section --> */}
  <section class="contact-section bg-black">
    <div class="container">

      <div class="row">

        <div class="col-md-4 mb-3 mb-md-0">
          <div class="card py-4 h-100">
            <div class="card-body text-center">
              <i class="fas fa-map-marked-alt text-primary mb-2"></i>
              <h4 class="text-uppercase m-0">Address</h4>
              <hr class="my-4" />
              <div class="small text-black-50">CodersEra, MIT WPU, Kothrud</div>
              <div class="small text-black-50">Pune, 411038</div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-3 mb-md-0">
          <div class="card py-4 h-100">
            <div class="card-body text-center">
              <i class="fas fa-envelope text-primary mb-2"></i>
              <h4 class="text-uppercase m-0">Email</h4>
              <hr class="my-4" />
              <div class="small text-black-50">
                <a href="#">contact@codersera.tech</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-3 mb-md-0">
          <div class="card py-4 h-100">
            <div class="card-body text-center">
              <i class="fas fa-mobile-alt text-primary mb-2"></i>
              <h4 class="text-uppercase m-0">Phone</h4>
              <hr class="my-4" />
              <div class="small text-black-50">+91 9168165583</div>
              <div class="small text-black-50">+91 8237887010</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* <!-- Footer --> */}
  <footer class="bg-black small text-center text-white-50" >
    <div class="container" style={{paddingBottom:"20px"}}>
      Coders' Era 2020
    </div>
  </footer>

  </div>

  );
}
export default Home;

{/* <div className="limiter">
<div className="container-login100 " style={{alignItems: "unset"}}>
  <div className="mainCard container">
            <div className="row">
            <h2>kdjsdhfkjkjln</h2>
            </div>


  </div>
</div>
</div> */}



