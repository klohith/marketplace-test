import { useAuth0 } from "@auth0/auth0-react";
import { Layout, Row, Col, Button } from 'antd';
import {
    LogoutOutlined
  } from '@ant-design/icons';
  
const { Header } = Layout;

function HeaderAuth() {
    const { logout, isAuthenticated } = useAuth0();

    return (
        <Header  style={{ textAlign: 'center' }} style={{ position: 'fixed', zIndex: 1, width: '100%',backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" }}>
            <Row>
                <Col xs={6} sm={8} md={8} lg={8} xl={8}>
                    <img style={{height:"30px",position:"relative",top:"-10px"}} src="https://global-uploads.webflow.com/5ec4807ed010d65457e8c1e0/608a4dc17610b448296b2551_medcase-health-logo-.png"/>
                </Col>
                <Col xs={13} sm={13} md={14} lg={14} xl={14}/>
                { isAuthenticated === true &&
                    <Col xs={5} sm={3} md={2} lg={2} xl={2} style={{ textAlign: 'right'}}>
                        <Button onClick={()=>{ logout({ returnTo: window.location.origin }) }} type="link"> <LogoutOutlined /> Sign Out</Button>
                    </Col>
                }
            </Row>
        </Header>
    );
}

export default HeaderAuth;