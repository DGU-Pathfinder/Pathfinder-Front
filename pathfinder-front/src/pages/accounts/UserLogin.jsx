import React from "react"
import "./UserLogin.scss"
import { ConfigProvider, Space } from "antd";
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function UserLogin() {
    return (
        <div className="user-login">
            <div className="pathfinder-main">
                <div className="pathfinder-logo" />
                <p className="pathfinder-title">Pathfinder</p>
            </div>
            <div className="user-login-form">
                <ConfigProvider theme={{
                    token: {
                        colorText: 'rgba(255, 255, 255)',
                        colorBorder: 'rgba(228, 112, 58)',
                        // colorInfoBg: 'rgba(255, 255, 255, 0.1)',
                        colorBgContainer: '#121212',
                    },
                    components: {
                        FormItem: {
                            // labelColor: 'rgba(228, 112, 58)',

                        },
                    }
                }}>
                    <Form
                        // form={form}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 15,
                        }}
                        style={{
                            maxWidth: 600,
                            margin: "auto",
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="ID"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 18 }}>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimaryBg: '#121212',
                                        colorPrimary: '#121212',
                                        colorPrimaryHover: '#121212',
                                    }
                                }}
                            >
                                <Button
                                    className="login-button"
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        width: "49%",
                                        borderColor: "rgba(255, 255, 255)",
                                        marginRight: "10px",
                                    }}
                                >
                                    Submit
                                </Button>
                            </ConfigProvider>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    );
};


export default UserLogin;