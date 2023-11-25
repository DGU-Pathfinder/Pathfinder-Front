import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import RtImage from "../components/RtImage"
import { Col, Row, Pagination, ConfigProvider } from "antd";
import "./RtImageList.scss"

const apiUrl = "http://localhost:8000/api/rt-images/";

function RtImageList() {
    const [rtImageList, setRtImageList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
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
    }, []);

    return (
        <div className="rt-page">
            <div className="rt-images-grid">
                <Row gutter={[16, 16]}
                    style={{ rowGap: "0px" }}
                >
                    {rtImageList.map(rtImage => (
                        <Col className="each-grid" span={12} key={rtImage.pk}>
                            <Link
                                key={rtImage.pk}
                                to={`/rt-image/${rtImage.pk}`}
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
                    current={1}
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