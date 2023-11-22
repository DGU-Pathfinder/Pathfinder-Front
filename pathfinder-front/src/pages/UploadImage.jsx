import React, { useState } from 'react';
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
            token: {
                // colorPrimary: 'rgba(18, 18, 18)',
                colorText: 'white',
            },
            components: {
                Button: {
                    // colorPrimaryHover: 'rgba(228, 122, 58)',

                    // colorBorder: 'rgba(228, 122, 58)',
                    // defaultBorderColor: 'rgba(228, 122, 58)',
                }
            }
        }}
    >

        <div className="body-container">
            <div className='drag-container'>
            <Dragger
                className=''{...props}
                style={{
                    borderColor: 'rgba(228, 122, 58)',
                }}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{color: "white"}} />
                </p>
                <p
                    className="ant-upload-text"
                    style={{
                        color: "white",
                        
                
                }}
                >
                    Click or drag RT images to this area to upload
                </p>
                {/* {/* <p className="ant-upload-hint" style={{color: "white"}}>
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files. */}
                {/* </p> */}
            </Dragger>
            </div>
        </div>
    </ConfigProvider>

)

export default UploadImage;

// const columns = [
//     {
//         title: 'Image',
//         dataIndex: 'image',
//     },
//     {
//         title: 'Size',
//         dataIndex: 'size',
//     },
// ];

// const data = [];
// for (let i = 0; i < 5; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`,
//     });
// }

// const UploadImage = () => {
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const start = () => {
//         setLoading(true);
//         // ajax request after empty completing
//         setTimeout(() => {
//             setSelectedRowKeys([]);
//             setLoading(false);
//         }, 1000);
//     };

//     const onSelectChange = (newSelectedRowKeys) => {
//         console.log('selectedRowKeys changed: ', newSelectedRowKeys);
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };

//     const hasSelected = selectedRowKeys.length > 0;
//     return (
//         <ConfigProvider
//             theme={{
//                 token: {
//                     colorPrimary: 'rgba(228, 122, 58)',
//                     colorBgContainer: 'rgba(18, 18, 18)',
//                     colorText: 'rgba(255, 255, 255)',
//                 },
//                 components: {
//                     Button: {
//                         // colorPrimary: 'rgba(18, 18, 18)',
//                         // colorPrimary: 'rgba(228, 122, 58)',
//                         defaultBorderColor: 'white',
//                         colorPrimaryActive: 'rgba(228, 122, 58)',
//                         // colorBorder: 'rgba(255, 255, 255)',
//                         // colorBorderBg: 'rgba(255, 255, 255)',
//                         colorPrimaryBorder: 'rgba(255, 255, 255)',
//                         colorPrimaryText: 'rgba(255, 255, 255)',
//                         colorTextDisabled: 'rgba(255, 255, 255)',
//                         // colorPrimaryHover: 'rgba(228, 122, 58)',
//                         colorPrimaryTextHover: 'rgba(228, 122, 58)',
//                         primaryShadow: '0px 0px 0px',
                    



//                         // colorBgTextActive: 'rgba(255, 255, 255)',

//                         colorPrimaryBorderHover: 'rgba(255, 255, 255)',

//                     },
//                     Table: {
//                         // rowSelectedBg: 'rgba(236, 159, 117)',
//                         // rowHoverBg: 'rgba(243, 115, 33, 0.3)',
//                         // rowSelectedHoverBg: 'rgba(228, 122, 58)'
//                         expandIconBg: 'rgba(228, 122, 58)',
//                         borderColor: 'rgba(255, 255, 255)',

//                     },
//                 },
//             }}
//         >
//             <div className="upload-table">
//                 <div
//                     style={{
//                     }}
//                 >
//                 </div>
//                 <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} bordered />
//                 <Button
//                     className="image-button"
//                     type="primary"
//                     onClick={start}
//                     disabled={!hasSelected}
//                     loading={loading}
//                 >
//                     Reload
//                 </Button>
//                 <span
//                     style={{
//                         marginLeft: 8,
//                         color: 'white',
//                     }}
//                 >
//                     {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//                 </span>
//             </div>
//         </ConfigProvider >
//     );
// };

// export default UploadImage;