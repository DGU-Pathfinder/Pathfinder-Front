import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import RtImage from "../../components/RtImageList/RtImage"
import Filter from "../../components/RtImageList/Filter"
import { Col, Row, Pagination, ConfigProvider } from "antd";
import "./RtImageList.scss"

const apiUrl = "http://127.0.0.1:8000/api/rt-images/";


function RtImageList() {
  const [rtImageList, setRtImageList] = useState([]);
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
    console.log(page);
  };

  useEffect(() => {
    let temp;

    temp = "?page=" + current;

    Axios.get(apiUrl + temp, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        console.log("loaded response : ", response);
        setRtImageList(data.results);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Rt Image List mounted.");
  }, [current]);

    return (
        <div className="rt-page">
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#121212'
                }
            }}>
                <Filter />
            </ConfigProvider>
            <div className="rt-images-grid">
                <Row
                    style={{ rowGap: "0px" }}
                >
                    {rtImageList.map(rtImage => (
                        <Col className="each-grid" span={12} key={rtImage.pk}>
                            <Link
                                key={rtImage.pk}
                                to={'/rt-image/${rtImage.pk}'}
                                style={{ color: "white" }}
                            >
                                <RtImage rtImage={rtImage} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>

            <ConfigProvider
                theme={{
                    token: {
                        colorText: '#909090'
                    },
                }}
            >
                <Pagination
                    current={current}
                    onChange={onChange}
                    defaultCurrent={1}
                    defaultPageSize={6}
                    pageSize={6}
                    style={{
                        textAlign: "center",
                        margin: "3%",
                    }}
                    total={data.count}
                    showSizeChanger={false}
                >
                </Pagination>
            </ConfigProvider>
        </div >
    );
}

export default RtImageList;