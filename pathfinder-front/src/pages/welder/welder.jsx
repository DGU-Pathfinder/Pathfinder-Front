import React, { useEffect, useState } from 'react';
import {
  Input,
  Card,
  Statistic,
  ConfigProvider,
  Divider
} from 'antd';
import {
  UserOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  BgColorsOutlined,
  DotChartOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import './welder.scss';
import axios from 'axios';
import TrySearch from "./TrySearch";

const apiUrl = `http://127.0.0.1:8000/api/welders/`;
const { Search } = Input;

const Welder = () => {
  const [welderName, setWelderName] = useState(null);
  const [welder, setWelder] = useState(null);
  const [defectCount, setDefectCount] = useState(null);

  useEffect(() => {
    if (welderName === null)
      return;
    else
      getWelder();
  }, [welderName]);

  const onSearch = (value) => {
    console.log("value : ", value);
    if (value === "")
      return;
    setWelderName(value);
  };

  const getWelder = async () => {
    console.log("URL : ", apiUrl + welderName + '/');
    await axios.get(apiUrl + `${encodeURIComponent(welderName)}/`,
      { withCredentials: true }
    ).then((response) => {
      const { data } = response;

      console.log("loaded res : ", response);
      console.log("welder data : ", data);

      setWelder(data);
      setDefectCount(data["slag_number"] + data["porosity_number"] + data["others_number"]);

      console.log("defectCount : ", defectCount);
    }).catch((error) => {
      console.log(error.response);

      if (error.response.status === 404)
        alert("해당 용접자가 존재하지 않습니다.");
      else
        alert("에러가 발생했습니다.");
    });
  };

  return (
    <>
      <Search
        className="welderInput"
        placeholder="용접사"
        onSearch={onSearch}
        prefix={<UserOutlined />}
        enterButton
      />
      {welderName === null ? (
        <div className="welderPage">
          <TrySearch />
        </div>
      ) : (
        <div className="welderPage">
          <Divider
            style={{
              borderColor: "rgba(228, 122, 58)",
              marginTop: "3%",
              // marginBottom: "8%",
            }}
          />
          <div className="welderDetail">
            <div className="welderDefectDetailCard">
              <div className="welderSuccessDetail">
                <ConfigProvider theme={{
                  token: {
                    colorText: 'rgba(255, 255, 255)',
                    colorBgContainer: '#121212',
                  },
                }}>
                  <Card bordered={true} >
                    <p className="cardTitle">용접 정확도</p>
                    <div className="statistic">
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
                    </div>
                  </Card>
                </ConfigProvider>
              </div>
              <div className="welderDefectDetail">
                <ConfigProvider theme={{
                  token: {
                    colorText: 'rgba(255, 255, 255)',
                    colorBgContainer: '#121212',
                  },
                }}>
                  <Card bordered={true}>
                    <p className="cardTitle">실패한 용접별 결함 (비율)</p>
                    <div className="statistic">
                      <Statistic
                        title="Slag"
                        value={welder && welder.slag_number / defectCount * 100}
                        precision={0}
                        valueStyle={{ color: 'red', }}
                        prefix={<BgColorsOutlined />}
                        suffix="%"
                      />
                      <Statistic
                        title="Porosity"
                        value={welder && welder.porosity_number / defectCount * 100}
                        precision={0}
                        valueStyle={{ color: 'blue', }}
                        prefix={<DotChartOutlined />}
                        suffix="%"
                      />
                      <Statistic
                        title="Others"
                        value={welder && welder.others_number / defectCount * 100}
                        precision={0}
                        valueStyle={{ color: 'green', }}
                        prefix={<QuestionCircleOutlined />}
                        suffix="%"
                      />
                    </div>
                  </Card>
                </ConfigProvider>
              </div>
              <div className="welderDefectDetail">
                <ConfigProvider theme={{
                  token: {
                    colorText: 'rgba(255, 255, 255)',
                    colorBgContainer: '#121212',
                  },
                }}>
                  <Card bordered={true}>
                    <p className="cardTitle">실패한 용접별 결함 (개수)</p>
                    <div className="statistic">
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
                    </div>
                  </Card>
                </ConfigProvider>
              </div>
            </div>
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
          </div>
          <Divider
            style={{
              borderColor: "rgba(228, 122, 58)",
              marginTop: "2%",
              marginBottom: "1%",
            }}
          />
        </div >
      )}
    </>
  );
}

export default Welder;