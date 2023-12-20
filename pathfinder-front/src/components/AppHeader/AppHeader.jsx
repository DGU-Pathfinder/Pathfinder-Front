import React from "react";
import { Layout, Menu, Button } from "antd";
import { PictureOutlined, AimOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./AppHeader.scss";

const { Header } = Layout;

const apiUrl = "http://127.0.0.1:8000/api/accounts/dj-rest-auth/logout/";

const menuItems = [
  {
    label: (
      <a href="/">
        탐지 결과
      </a>
    ),
    key: 'rt-image',
    icon: <PictureOutlined style={{ fontSize: '20px' }} />,
  },
  {
    label: (
      <a href="/upload-image">
        AI 탐지
      </a>
    ),
    key: 'ai-detection',
    icon: <AimOutlined style={{ fontSize: '20px' }} />,
  },
  {
    label: (
      <a href="/welder">
        용접사 검색
      </a>
    ),
    key: 'evaluation',
    icon: <UserOutlined style={{ fontSize: '20px' }} />,
  },
];

function createItemsFromMenu(menuItem) {
  return menuItem.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
  }));
}


const logoutApi = () => {
  axios.post(apiUrl, {}, { withCredentials: true })
    .then((response) => {
      console.log(response);
      alert("Logout Success");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log(error);
    });
};

function AppHeader() {
  const itemStyle = { marginRight: '10px' };
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <Header
      className="main-header"
      style={{
        backgroundColor: '#2C2C2C',
        // position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}>
      <div className="logo-site-name">
        <div className="demo-logo" />
        <h1 className="site-name" style={{ color: '#F37321' }}>Pathfinder</h1>
      </div>
      <Menu
        theme="dark"
        className="menu-buttons"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={createItemsFromMenu(menuItems).map((item) => ({
          ...item,
          style: itemStyle,
        }))}
        style={{
          backgroundColor: '#2C2C2C',
          height: '32px',
          width: '40%',
        }}
      />
      {isLoginPage &&
        <Button className="logout-button" type="link">
          LOGIN
        </Button>
      }
      {!isLoginPage &&
        <Button className="logout-button" type="link" onClick={logoutApi}>
          LOGOUT
        </Button>
      }
    </Header>
  )
}

export default AppHeader;