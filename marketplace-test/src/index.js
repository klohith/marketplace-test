import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./auth0_provider_with_history";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import HeaderAuth from "./headerAuth";
import "antd/dist/antd.css";
import { Route, Switch } from "react-router";
import HomePage from "./pages/home/Homepage";
import History from "./pages/history/History";

import LoggedOut from "./loggedOut.js";
import { useAuth0 } from "@auth0/auth0-react";

const { Content, Footer } = Layout;

// import dotenv from "dotenv"

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Switch>
        {/* <Route
          exact
          path="/"
          component={() => {
            var { isAuthenticated } = useAuth0();
            <HomePage authorized={isAuthenticated} />;
          }}
        /> */}
        <Route exact path="/login" component={LoggedOut} />
        <Route
          exact
          path="/history"
          render={() => {
            return <History />;
          }}
        />
        <Route>
          <Layout style={{ height: "100%" }}>
            <HeaderAuth />
            <Content style={{ margin: "6rem 1rem", padding: "0 50px" }}>
              <App />
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Route>
      </Switch>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
