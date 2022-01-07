import React from "react";
import LogoutButton from "./logoutBuuton.js";
import Profile from "./userProfile.js";
import "./loggedin.css";
import "./logo192.png";

function LoggedIn() {
  return (
    <div>
      <header className="header">
        <div className="">
          <a href="#default" className="logo">
            <img
              src="https://sponsors.hlth.com/2021/wp-content/uploads/sites/3/2021/06/Medcase_medcase_Logo_Vertical_RGB_full-color.png"
              width="75"
              height="50"
              alt="medcase"
            />
          </a>
        </div>

        <LogoutButton />
        <Profile />
        {/* <img src={public.logo192.png}></img> */}
      </header>
    </div>
  );
}

export default LoggedIn;
