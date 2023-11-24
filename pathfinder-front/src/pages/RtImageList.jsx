import React, { useEffect, useState } from "react";
import Axios from "axios";
import RtImage from "../components/RtImage"
import { Col, Row, Pagination, ConfigProvider } from "antd";
import "./RtImageList.scss"

const apiUrl = "http://localhost:8000/api/rt-images/";

function RtImageList() {
    const [rtImageList, setRtImageList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                console.log("loaded response : ", response);
                setRtImageList(data.results);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("Rt Image List mounted.");
    }, []);

    return (
        <div className="rt-page">
            <div className="rt-images-grid">
                {/* <h2 style={{ textAlign: "center" }}>RT Image List</h2> */}
                <Row gutter={[16, 16]}
                // style={{rowGap: "0px"}}
                >
                    {rtImageList.map(rtImage => (
                        <Col className="each-grid" span={12} key={rtImage.pk}>
                            <RtImage rtImage={rtImage} />
                        </Col>
                    ))}
                </Row>

            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorText: 'rgb(255, 255, 255)',
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
                    total={71}
                    showSizeChanger={false}
                >
                </Pagination>
            </ConfigProvider>
        </div >
    );

}

export default RtImageList;