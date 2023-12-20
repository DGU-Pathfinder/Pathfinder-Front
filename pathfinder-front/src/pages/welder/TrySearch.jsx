import React from 'react';
import { SmileFilled } from '@ant-design/icons';
import { ConfigProvider, Result } from 'antd';

const TrySearch = () => (
  <ConfigProvider theme={{
    token: {
      colorText: 'white',
      fontSize: '40px'
    },
  }}
  >
    <Result
      icon={<SmileFilled
        style={{
          color: "rgba(228, 122, 58)",
          fontSize: "100px"
        }}
      />
      }
      title="찾고 싶은 용접사를 검색해보세요!"
      style={{
        fontWeight: "bold",
        marginTop: "7%",
        marginBottom: "7%",
      }}
    />
  </ConfigProvider >
);

export default TrySearch;