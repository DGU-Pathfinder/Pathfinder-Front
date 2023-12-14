import React from 'react';
import { ConfigProvider, Result } from 'antd';

const NotFoundPage = () => (
  <ConfigProvider theme={{
    token: {
      colorText: 'white'
    },
  }}
  >
    <Result
      status="warning"
      title="There are some problems with your operation."
      style={{
        fontWeight: "bold",
        marginTop: "10%",
        marginBottom: "10%",
      }}
    />
  </ConfigProvider>
);
export default NotFoundPage;