import React, { useEffect, useState } from "react";
import Axios from "axios";
import RtImage from "../components/RtImage"
import { Col, Row, Pagination } from "antd";

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
        <div className="rt-images-grid">
            <h2 style={{ textAlign: "center" }}>RT Image List</h2>
            <Row gutter={[16, 16]}>
                {rtImageList.map(rtImage => (
                    <Col span={12} key={rtImage.pk}>
                        <RtImage className="rt-image" rtImage={rtImage} />
                    </Col>
                ))}
            </Row>
        </div>
    );

}

export default RtImageList;