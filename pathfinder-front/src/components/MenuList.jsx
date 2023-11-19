import React, { useState } from 'react';
import { PictureOutlined, AimOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: (
      <a href="/">
        탐지 결과
      </a>
    ),
    key: 'rt-image',
    icon: <PictureOutlined />,
  },
  {
    label: (
      <a href="/ai-detection">
        AI 탐지
      </a>
    ),
    key: 'ai-detection',
    icon: <AimOutlined />,
  },
  {
    label: (
      <a href="/evaluation">
        평가한 항목
      </a>
    ),
    key: 'evaluation',
    icon: <UserOutlined />,
  },
];

function MenuList() {
  const [current, setCurrent] = useState('rt-image');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuList;