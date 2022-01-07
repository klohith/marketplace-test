import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Col} from "antd";
import {
  LoginOutlined
} from '@ant-design/icons';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Col style={{textAlign:"center"}} xs={24} sm = {24} md ={24} lg ={24} xl = {24}> 
            <Button type="primary" size="large" onClick={() => loginWithRedirect()}> <LoginOutlined />Sign in</Button>
          </Col>
};

export default LoginButton;