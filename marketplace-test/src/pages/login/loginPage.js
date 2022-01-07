import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginWithRedirect() {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  // return (
  //     <div>

  //     </div>
  // )
}

export default LoginWithRedirect;
