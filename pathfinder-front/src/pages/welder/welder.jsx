import React, { useEffect, useState } from 'react';
import { Input, Card, Statistic } from 'antd';
import { UserOutlined, ArrowUpOutlined, CheckCircleOutlined, CloseCircleOutlined, BgColorsOutlined, DotChartOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './welder.scss';
import axios from 'axios';

const apiUrl = `http://127.0.0.1:8000/api/welders/`;

const Welder = () => {
  const [welderName, setWelderName] = useState("윤재호");
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
          <Card bordered={false}>
            <p className="cardTitle">용접 정확도</p>
            <Statistic
              title="용접 성공률"
              value={welder && welder.success_count / welder.number * 100}
              precision={2}
              valueStyle={{ color: '#3f8600', }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic
              title="용접 성공 개수"
              value={welder && welder.success_count}
              precision={0}
              valueStyle={{ color: '#3f8600', }}
              prefix={<CheckCircleOutlined />}
              suffix="개"
            />
            <Statistic
              title="용접 실패 개수"
              value={welder && welder.number - welder.success_count}
              precision={0}
              valueStyle={{ color: 'red', }}
              prefix={<CheckCircleOutlined />}
              suffix="개"
            />
          </Card>
        </div>
        <div className="welderDefectDetail">
          <Card bordered={false}>
            <p className="cardTitle">실패한 용접별 결함 비율</p>
            <Statistic
              title="Slag"
              value={welder && welder.slag_number}
              precision={0}
              valueStyle={{ color: 'red', }}
              prefix={<BgColorsOutlined />}
              suffix="개"
            />
            <Statistic
              title="Porosity"
              value={welder && welder.porosity_number}
              precision={0}
              valueStyle={{ color: 'blue', }}
              prefix={<DotChartOutlined />}
              suffix="개"
            />
            <Statistic
              title="Others"
              value={welder && welder.others_number}
              precision={0}
              valueStyle={{ color: 'green', }}
              prefix={<QuestionCircleOutlined />}
              suffix="개"
            />
          </Card>
        </div>
        <div className="welderDefectDetail">
          <Card bordered={false}>
            <p className="cardTitle">실패한 용접별 결함 비율</p>
            <Statistic
              title="Slag"
              value={welder && welder.slag_number}
              precision={0}
              valueStyle={{ color: 'red', }}
              prefix={<BgColorsOutlined />}
              suffix="개"
            />
            <Statistic
              title="Porosity"
              value={welder && welder.porosity_number}
              precision={0}
              valueStyle={{ color: 'blue', }}
              prefix={<DotChartOutlined />}
              suffix="개"
            />
            <Statistic
              title="Others"
              value={welder && welder.others_number}
              precision={0}
              valueStyle={{ color: 'green', }}
              prefix={<QuestionCircleOutlined />}
              suffix="개"
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Welder;