import React from "react"
import "./UserLogin.scss"
import { ConfigProvider } from "antd";
import { Button, Form, Input } from 'antd';
import axios from "axios";


const loginUrl = "http://127.0.0.1:8000/api/accounts/dj-rest-auth/login/";

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function UserLogin() {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log('User Input :', values);
    try {
      const response = await axios.post(loginUrl, {
        username: values.username,
        password: values.password,
      },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("loaded response : ", response);
        console.log("login success");
        window.location.href = "/";
      } else {
        console.log("login failed");
      }
    }
    catch (error) {
      console.log(error.response);
      alert("Login Failed");
    }

  };

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
            colorBgContainer: '#121212',
          },
        }}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15 }}
            style={{
              maxWidth: 600,
              margin: "auto",
            }}
            initialValues={{ remember: true }}
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