import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import { Button, Col, ConfigProvider, Row } from "antd"
import RtImageDetailData from "../components/RtImageDetailData"
import DetailTable from "../components/DetailTable"

const apiUrl = "http://localhost:8000/api/rt-images/";

function RtImageDetail() {
    const params = useParams();
    const rtImageId = params.id;

    const [rtImage, setRtImage] = useState(null);

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

    if (!rtImage) {
        return <div>Loading...</div>;
    }

    const aiDefects = rtImage?.ai_model_set?.[0]?.ai_defect_set || [];
    const expertDefects = rtImage?.expert?.[0]?.expert_defect_set || [];
    console.log("aiDefects : ", aiDefects);

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
                        <RtImageDetailData key={1} rtImage={rtImage} />
                    </div>
                </Col>
                <Col span={6}>
                    <DetailTable defect_set={aiDefects} analyzer={"AI"} />
                </Col>
            </Row >

            <Row>
                <Col span={18}>
                    <div className="rt-image-expert-detail">
                        <RtImageDetailData key={2} rtImage={rtImage} />
                    </div>
                </Col>
                <Col span={6}>
                    <div className="rt-table-expert">
                        <DetailTable defect_set={aiDefects} analyzer={"Expert"} />
                        <Button>
                            Click to Edit
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default RtImageDetail;