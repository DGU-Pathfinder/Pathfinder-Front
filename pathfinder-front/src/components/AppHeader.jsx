import React from "react";
import "./AppHeader.scss";
import { Layout , Menu } from "antd";
const { Header } = Layout;

function AppHeader() {
    return (
      <Header
        style={{
          backgroundColor: '#2C2C2C',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
      }}>
        <div className="header-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
      />
      </Header>

    )
}

export default AppHeader;