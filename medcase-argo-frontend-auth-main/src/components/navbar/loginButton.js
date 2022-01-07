import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import "./"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="button" onClick={() => loginWithRedirect()}>
      Sign In
    </button>
  );
};

export default LoginButton;
