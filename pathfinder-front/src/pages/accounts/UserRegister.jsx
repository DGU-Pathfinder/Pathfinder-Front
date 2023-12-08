import React from "react"
import { Form, Input, Button, ConfigProvider } from 'antd';
import "./UserRegister.scss"

const UserRegister = () => {
  const [form] = Form.useForm();

  return (
    <div className="user-register">
      <div className="register-pathfinder-main">
        <div className="register-pathfinder-logo" />
        <p className="register-pathfinder-title">Pathfinder</p>
      </div>
      <div className="register-pathfinder-sub">
        <p className="register-pathfinder-subtitle">Create New Account</p>
      </div>


      <ConfigProvider theme={{
        token: {
          colorText: 'rgba(255, 255, 255)',
          colorBorder: 'rgba(228, 112, 58)',
          colorBgContainer: '#121212',
          colorTextPlaceholder: '#888888'
        },
        components: {
          Input: {
            hoverBorderColor: 'rgba(228, 112, 58)',
            activeBorderColor: 'rgba(228, 112, 58)',
          }
        }
      }}>
        <Form
          form={form}
          name="registeration"
          autoComplete="off"
          style={{
            maxWidth: 600,
            margin: "auto",
          }}
          layout="vertical"
        >

          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="이름 (name)" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your ID!' }]}
          >
            <Input placeholder="아이디 (ID)"
              style={{ width: "80%" }}
            />
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
                className="id-check-button"
                type="primary"
                htmlType="submit"
                style={{
                  marginLeft: "3.5%",
                  borderColor: "rgba(255, 255, 255)"
                }}
              >
                ID 중복확인</Button>
            </ConfigProvider>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="비밀번호 (Password)" />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Check the confirm password!'));
                },
              }),
            ]}
          >
            <Input placeholder="비밀번호 확인 (Confirm Password)" />
          </Form.Item>

          <Form.Item>
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
                className="register-button"
                type="primary"
                htmlType="submit"
                style={{
                  width: "16.5%",
                  marginLeft: "auto",
                  display: "block",
                  borderColor: "rgba(255, 255, 255)",
                }}
              >
                register
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default UserRegister;