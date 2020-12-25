import React ,{useEffect, useState}from "react";
import { BrowserRouter, Switch, Redirect, Route,Link,useHistory } from "react-router-dom";
import firebase from "./firebase";
import Login from "./Login/login";
import Register from "./Register/register";
import Dashboard from "./Dashboard/dashboard";
import Leaderboard from "./Leaderboard/leaderboard";
import Clue from "./CluePage/clue";
import Home from "./Home/home";
import Navbar from "./Navbar/navbar";

function storageGetter() {
  const bol = localStorage.getItem("user") === "true";
  console.log(bol)
  return bol; // Returns true if user is authenticated
}

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  console.log(auth)
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  let userState = storageGetter(); // Returns true if user is authenticated
  return (
    <Route
      {...rest}
      render={(props) =>
        userState && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
// Template
// - Public Route restricted = false
// - Restricted Route restricted = true in public route
// - Private route

function Routes() {

  let history = useHistory();
  const [userAuthState,setUserAuthState] = useState(storageGetter())

  // useEffect(()=>{
  //   if(firebase.auth().currentUser){
  //     firebase.database().ref('Users').child(firebase.auth().currentUser.uid).child('cart').on('value',snap=>{
  //       if(snap.val()){
  //         setCart(Object.values(snap.val()))
  //       }
  //       else{
  //         setCart([])
  //       }
  //     })
  //   }
  // },[firebase.auth().currentUser])

  useEffect(() => {
    console.info("Firebase request generated");
    // if(firebase.auth().currentUser) setUserAuthState(true);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.uid)
        localStorage.setItem("user", "true");
        // window.location = "/dashboard"
        setUserAuthState(true);
      } else {
        // No user is signed in.
        localStorage.setItem("user", "false");
        setUserAuthState(false);
      }
    });
  }, []);

  return (
    <div className="global-min-height">
      <BrowserRouter>
      <Navbar />
        <div style={{minHeight:"90vh"}}>
          <Switch>
            {/* Public Paths */}
            <PublicRoute
              restricted={true}
              component={Login}
              path="/login"
              exact
            />
            <PublicRoute
              restricted={true}
              component={Register}
              path="/register"
              exact
            />
            <PublicRoute
              restricted={false}
              component={Leaderboard}
              path="/leaderboards"
              exact
            />
            <PublicRoute
              restricted={false}
              component={Home}
              path="/home"
              exact
            />
            <PublicRoute
              restricted={false}
              component={Clue}
              path="/clue"
              exact
            />

            {/* Private routes */}
            <PrivateRoute
              auth={userAuthState}
              component={Dashboard}
              path="/dashboard"
              exact
            />
            {/* External Routes */}
            <Route
              path="/external"
              component={() => {
                window.location.href = "https://example.com/1234"; // Redirect to this
                return null;
              }}
              exact
            />
            {userAuthState?<Redirect to="/dashboard" />:<Redirect to="/home" />}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default Routes;
