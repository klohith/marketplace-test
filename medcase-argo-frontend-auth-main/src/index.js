import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./auth0_provider_with_history";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import HeaderAuth from "./headerAuth";
import "antd/dist/antd.css";
const { Content, Footer } = Layout;
// import dotenv from "dotenv"

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Layout style={{ height: "100%" }}>
        <HeaderAuth />
        <Content style={{ margin: "6rem 1rem", padding: "0 50px" }}>
          <App />
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
