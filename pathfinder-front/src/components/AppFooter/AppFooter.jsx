import React from "react";
import { Divider } from "antd";
import "./AppFooter.scss";

function AppFooter() {
  return (
    <>
      {/* <Divider
        style={{
          borderColor: "rgba(255, 255, 255)",
        }}
      /> */}
      <div className="AppFooter">
        Pathfinder ©2023 Created by Dongguk Univ. Department of ICE
      </div>
    </>
  )
}

export default AppFooter;