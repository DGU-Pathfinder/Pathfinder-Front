import React, { useEffect, useState } from 'react';
import { Input, Card, Statistic } from 'antd';
import { UserOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './welder.scss';
import axios from 'axios';

const apiUrl = `http://127.0.0.1:8000/api/welders/`;

const Welder = () => {
  const [welderName, setWelderName] = useState("최정흠");
  // const [welderName, setWelderName] = useState("cHgAzYS");
  const [welder, setWelder] = useState(null);

  useEffect(() => {
    getWelder();
  }, []);

  const getWelder = () => {
    console.log("URL : ", apiUrl + welderName + '/');
    axios.get(apiUrl + `${encodeURIComponent(welderName)}/`, { withCredentials: true }
    ).then((response) => {
      const { data } = response;
      console.log("loaded res : ", response);
      console.log("welder data : ", data);
      setWelder(data);
    }).catch((error) => {
      console.log(error.response);
    });
  };

  const onChange = (e) => {
    setWelderName(e.target.value);
  }

  return (
    <div className="welderPage">
      <Input
        className='welderInput'
        placeholder="Welder"
        onChange={onChange}
        prefix={<UserOutlined />}
      />

      <div className="welderDetail">
        <div className="welderImageInfo">
          <div className="welderImage"></div>
          <p
            className="welderName"
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255)",
              marginBottom: "0px",
            }}
          >
            {welder && welder.name}</p>
        </div>
        <div className="welderSuccessDetail">
          {welder && welder.success_count / welder.number}
          <Card bordered={false}>
            <Statistic
              title="용접 성공률"
              value={welder && welder.success_count / welder.number * 100}
              precision={2}
              valueStyle={{ color: '#3f8600', }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic
              title="용접 성공률"
              value={welder && welder.success_count / welder.number * 100}
              precision={2}
              valueStyle={{ color: '#3f8600', }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Welder;