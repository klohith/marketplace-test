import React, { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import LoggedIn from "./loggedin.js";
import { useHistory } from "react-router-dom";
import HomePage from "./pages/home/Homepage";

import LoggedOut from "./loggedOut.js";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import JuniorReviewer from "./pages/home/JuniorReviewer.js";
import History from "./pages/home/History.js";
import axios from "axios";

const App = () => {
  var { isAuthenticated } = useAuth0();
  let history = useHistory();

  // const [isAuthorized, setAuthorized] = useState(false);
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      history.push("/");
    } else {
      //https://google-hes-development.eu.auth0.com/authorize?response_type=token&connection=google-oauth2&client_id=IShWf4hQRr7hmbNGsHfANxqwfxTKyxEU&redirect_uri=http://localhost:3000&scope=read:current_user
      const uri = `https://medcase-dev.eu.auth0.com/authorize?response_type=token&connection=google-oauth2&client_id=TcsU556BBXOTGilwFdsXKzqqqsv9wB7G&redirect_uri=http://localhost:3000&scope=read:current_user update:current_user_metadata&nonce=NONCE&prompt=none&audience=https://medcase-dev.eu.auth0.com/api/v2/`;
      console.log(uri);
      window.location.href = uri;
    }
    // try silent sign in
    //   // var token;
    //   // window.addEventListener("message", async (event) => {
    //   //   console.log(event.data);
    //   //   const token = event.data;
    //   //   const uri = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?response_type=token&client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&redirect_uri=https://arge-hes.ue.r.appspot.com/&scope=read:current_user update:current_user_metadata&prompt=none&audience=https://google-hes-development.eu.auth0.com/api/v2/&response_mode=success`;
    //   //   console.log(uri);
    //   //   const response = await axios.get(uri);
    //   //   console.log(response, "response");
    //   //   // if (response.status == 200) {
    //   //   //   setAuthorized(true);
    //   //   // }
    //   // });
    //   // GET https://YOUR_DOMAIN/authorize
    //   // ?response_type=id_token token&
    //   // client_id=...&
    //   // redirect_uri=...&
    //   // state=...&
    //   // scope=openid...&
    //   // nonce=...&
    //   // audience=...&
    //   // response_mode=...&
    //   // prompt=none
    //   // const uri = `https://${domain}/authorize`;
  }, [history, isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <Fragment>
          <Route path="/" exact component={JuniorReviewer} />
          <Route path="/history" exact component={History} />
        </Fragment>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
  //return <div> <HomePage /></div>;
};

export default App;
