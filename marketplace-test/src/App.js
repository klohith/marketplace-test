import React from "react";
// import { Route, Switch } from "react-router-dom";
// import LoggedIn from "./loggedin.js";
import HomePage from "./pages/home/Homepage";
import History from "./pages/history/History";

import LoggedOut from "./loggedOut.js";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
// import Homepage from "./pages/home/Homepage";
// import RoutesHandler from "./pages/home/RoutesHandler.js";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  var { isAuthenticated } = useAuth0();
  return <div>{isAuthenticated ? <HomePage /> : <LoggedOut />}</div>;
  // return (
  //   <Router>
  //     <Switch>
  //       <Route
  //         exact
  //         path="/"
  //         component={() => <HomePage isAuthenticated={isAuthenticated} />}
  //       />
  //       <Route path="/login" component={LoggedOut} />
  //       <Route exact path="/history" component={History} />
  //     </Switch>
  //   </Router>
  // );
  //return <div> <HomePage /></div>;
};

export default App;
