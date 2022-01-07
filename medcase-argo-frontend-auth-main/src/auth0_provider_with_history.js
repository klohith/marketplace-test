import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appstate) => {
    history.push(appstate?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="https://medcase-dev.eu.auth0.com"
      clientId="sI6BJkKJ0VFbXXgbtVLgea5UWEDzadDV"
      redirectUri={window.location.origin}
      audience="https://medcase.marketplace.api/"
      scope="read:current_user update:current_user_metadata"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
