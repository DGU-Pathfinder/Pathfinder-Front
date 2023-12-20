import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Row, Col, Card, Statistic, ConfigProvider, message, Upload } from 'antd';
import './UploadImage.scss';


const { Dragger } = Upload;

const props = {
  name: 'image',
  multiple: true,
  action: 'http://127.0.0.1:8000/api/rt-images/',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const UploadImage = () => (

  <>
    <ConfigProvider
      theme={{
        token: { colorText: 'white', },
      }}
    >
      <div className="body-container">
        <div className='drag-container'>
          <Dragger
            className=''{...props}
            style={{
              borderColor: 'rgba(228, 122, 58)',
            }}
            withCredentials={true}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "white" }} />
            </p>
            <p
              className="ant-upload-text"
              style={{ color: "white", }}
            >
              Click or drag RT images to this area to upload
            </p>
          </Dragger>
        </div>
      </div>
    </ConfigProvider>

    <Row gutter={0} justify="center">
      <Col span={8}>
        <Card bordered={true} className="defect-card">
          <p className="cardTitle">Porosity</p>
          <div className="statistic">
            <Statistic
              title="Precision"
              value={83}
              valueStyle={{ color: 'blue', }}
              suffix="%"
            />
            <Statistic
              title="Recall"
              value={74}
              valueStyle={{ color: 'blue', }}
              suffix="%"
            />
            <Statistic
              title="F1 score"
              value={78}
              valueStyle={{ color: 'blue', }}
              suffix="%"
            />
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={true} className="defect-card">
          <p className="cardTitle">Slag</p>
          <div className="statistic">
            <Statistic
              title="Precision"
              value={93}
              valueStyle={{ color: 'red', }}
              suffix="%"
            />
            <Statistic
              title="Recall"
              value={85}
              valueStyle={{ color: 'red', }}
              suffix="%"
            />
            <Statistic
              title="F1 score"
              value={78}
              valueStyle={{ color: 'red', }}
              suffix="%"
            />
          </div>
        </Card>
      </Col>
    </Row>
  </>
)

export default UploadImage;