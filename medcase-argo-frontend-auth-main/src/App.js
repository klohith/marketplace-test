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
  var { isAuthenticated,getAccessTokenSilently,buildAuthorizeUrl } = useAuth0();
  let history = useHistory();
  // getAccessTokenSilently({redirect_uri: "http://localhost:3000", })
  //     .then(r=>console.log("authenticated", r))
  //     .catch(r=>console.log("error", r))
  // const [isAuthorized, setAuthorized] = useState(false);
  useEffect(() => {
    console.log(isAuthenticated);
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
