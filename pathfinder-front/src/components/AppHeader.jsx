import React from "react";
import "./AppHeader.scss";
import { Layout, Menu, Button } from "antd";
import { PictureOutlined, AimOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

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
      <a href="/evaluation">
        평가한 항목
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


function AppHeader() {
  const itemStyle = { marginRight: '10px' };
  return (
    <Header
      className="main-header"
      style={{
        backgroundColor: '#2C2C2C',
        position: 'sticky',
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
      <Button className="logout-button" type="link">
        LOGOUT</Button>
    </Header>
  )
}

export default AppHeader;