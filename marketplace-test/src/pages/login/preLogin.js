import React from "react";
import LoginWithRedirect from "./loginPage";

function PreLogin() {
  return (
    <div>
      <p>Login Please</p>
      <button onClick={LoginWithRedirect}>Login</button>
    </div>
  );
}

export default PreLogin;
