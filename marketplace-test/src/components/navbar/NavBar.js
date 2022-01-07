import React from "react";
import logo from "./logo.svg";
import styles from "./navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logoutBuuton.js";
import LoginButton from "./loginButton.js";

const NavBar = () => {
  var { isAuthenticated } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      <header className="home" style={styles}>
        <img className="logo" src={logo}></img>
        <h1 className="heading">Home</h1>
        <LogoutButton />
      </header>
    </div>
  );
};

export default NavBar;
