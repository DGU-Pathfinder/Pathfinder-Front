import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import { Button, Col, ConfigProvider, Row, Table } from "antd"
import RtImageDetailData from "../components/RtImageDetailData"

const apiUrl = "http://localhost:8000/api/rt-images/";

function RtImageDetail() {
    const params = useParams();
    const rtImageId = params.id;

    const [rtImage, setRtImage] = useState([]);

    useEffect(() => {
        console.log("URL : ", apiUrl + rtImageId);
        Axios.get(apiUrl + rtImageId)
            .then((response) => {
                const { data } = response;
                console.log("loaded response : ", response);
                setRtImage(data);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("Rt Image Detail mounted.");
    }, []);

    return (
        <div className='rt-image-detail-container'>
            <h1
                style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255)"
                }}
            >
                {rtImage.image_name}
            </h1>
            <Row>
                <Col span={18}>
                    <div className='rt-image-ai-detail'>
                        {rtImage && <RtImageDetailData key={1} rtImage={rtImage} />}
                    </div>
                </Col>
                <Col span={6}>
                    <Table
                        style={{
                            // justifyContent: "center",
                            // display: "flex",
                        }}
                    />
                </Col>
            </Row >

            <Row>
                <Col span={18}>
                    <div className="rt-image-expert-detail">
                        {rtImage && <RtImageDetailData key={2} rtImage={rtImage} />}
                    </div>
                </Col>
                <Col span={6}>
                    <Button />
                    <Table />
                </Col>
            </Row>
        </div >
    );
}

export default RtImageDetail;