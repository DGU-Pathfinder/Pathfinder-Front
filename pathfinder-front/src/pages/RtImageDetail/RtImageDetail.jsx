import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import { Button, Col, ConfigProvider, Divider, Row } from "antd"
import RtImageDetailData from "../../components/RtImageDetail/RtImageDetailData"
import DetailTable from "../../components/RtImageDetail/DetailTable"
import RtImageModal from "../../components/RtImageDetail/RtImageModal"
import "./RtImageDetail.scss"

const apiUrl = "http://127.0.0.1:8000/api/rt-images/";

function RtImageDetail() {
  const params = useParams();
  const rtImageId = params.id;

  const [rtImage, setRtImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    console.log("URL : ", apiUrl + rtImageId);
    Axios.get(apiUrl + rtImageId, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        console.log("loaded response : ", response);
        setRtImage(data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          window.location.href = "/login";
        }
        console.log(error.response);
      });

    console.log("Rt Image Detail mounted.");
  }, [rtImageId]);

  if (!rtImage) {
    return <div>Loading...</div>;
  }

  const aiDefects = rtImage?.ai_model?.ai_defect_set || "no ai data"
  const expertDefects = rtImage?.expert?.expert_defect_set || "no expert data";

  return (
    <div className='rt-image-detail-container'>
      <Divider
        style={{
          borderColor: "rgba(228, 122, 58)",
          marginTop: "2%",
          marginBottom: "0",
        }}
      ><h1
        style={{
          textAlign: "center",
          color: "rgba(255, 255, 255)",
        }}
      >
          {rtImage.image_name}
        </h1></Divider>
      <Row align="middle">
        <Col span={18}>
          <div className='rt-image-ai-detail'>
            <RtImageDetailData key={1} rtImage={rtImage} defects={aiDefects} />
          </div>
        </Col>
        <Col span={6}>
          <DetailTable defect_set={aiDefects} analyzer={"AI"} />
        </Col>
      </Row >

      <div
        className="rt-image-detail-divider"
        style={{
          marginLeft: "3%",
          marginRight: "3%",
        }}
      >
        <Divider
          style={{
            borderColor: "rgba(255, 255, 255)",
            margin: "0px",
          }}
        />
      </div>

      <Row align="middle">
        <Col span={18}>
          <div className="rt-image-expert-detail">
            <RtImageDetailData key={2} rtImage={rtImage} defects={expertDefects === "no expert data" ? aiDefects : expertDefects} />
          </div>
        </Col>
        <Col span={6}>
          <div className="rt-table-expert">
            <DetailTable defect_set={expertDefects} analyzer={"Expert"} />
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "#121212",
                    defaultBorderColor: "rgba(255, 255, 255)",
                    defaultColor: "rgba(255, 255, 255)",
                  }
                }
              }}
            >
              <Button
                className="rt-image-edit-button"
                onClick={openModal}
                style={{
                  width: "70%",
                  display: "block",
                  margin: "auto",
                  marginTop: "2%",
                }}>
                Click to Edit
              </Button>
              <RtImageModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                rtImage={rtImage}
              />
            </ConfigProvider>
          </div>
        </Col>
      </Row>
      <Divider
        style={{
          borderColor: "rgba(228, 122, 58)",
          margin: "0px",
          marginBottom: "2%",
        }}
      />
    </div>
  );
}

export default RtImageDetail;