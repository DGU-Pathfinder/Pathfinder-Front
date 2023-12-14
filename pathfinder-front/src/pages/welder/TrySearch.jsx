import React from 'react';
import { SmileFilled } from '@ant-design/icons';
import { ConfigProvider, Result } from 'antd';

const TrySearch = () => (
  <ConfigProvider theme={{
    token: {
      colorText: 'white'
    },
  }}
  >
    <Result
      icon={<SmileFilled style={{ color: "rgba(228, 122, 58)" }} />}
      title="찾고 싶은 용접자를 검색해보세요!"
      style={{
        fontWeight: "bold",
        marginTop: "5%",
        marginBottom: "5%",
      }}
    />
  </ConfigProvider >
);
export default TrySearch;