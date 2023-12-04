import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { ConfigProvider, message, Upload } from 'antd';
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
)

export default UploadImage;