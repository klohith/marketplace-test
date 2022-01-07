import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Homepage from "../home/Homepage";
import NavBar from "../../components/navbar/NavBar";
import LoginWithRedirect from "./loginPage";
import PreLogin from "./preLogin";
const LoginPage = () => {
  var { isAuthenticated } = useAuth0();
  //   const { loginWithRedirect } = useAuth0();
  //   isAuthenticated = useState(true);
  //   useEffect(() => {
  //     const login = () => {
  //       loginWithRedirect();
  //       isAuthenticated = true;
  //     };
  //     isAuthenticated ? console.log(isAuthenticated, true) : login();
  //   }, [isAuthenticated]);
  // return <div>{isAuthenticated ? <Homepage /> : <LoginWithRedirect />}</div>;
  return isAuthenticated ? <Homepage /> : <PreLogin />;
};

export default LoginPage;
