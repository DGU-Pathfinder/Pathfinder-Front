import React, { useState } from "react"
import { Form, Input, Button, ConfigProvider } from 'antd';
import "./UserRegister.scss"
import axios from "axios";

const registerUrl = "http://127.0.0.1:8000/api/accounts/dj-rest-auth/registration/";
const idDuplicateCheckUrl = "http://127.0.0.1:8000/api/accounts/id-duplicate-check/";


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const UserRegister = () => {
  const [form] = Form.useForm();
  const [isIdChecked, setIsIdChecked] = useState(false);

  const idValidator = () => (
    isIdChecked ? Promise.resolve() : Promise.reject(new Error('Check the ID!'))
  );

  const idDuplicateCheck = async (values) => {
    console.log("idDuplicateCheck : ", form.getFieldValue('username'));
    await axios.post(idDuplicateCheckUrl, {
      username: form.getFieldValue('username'),
    },
      { withCredentials: true }
    )
      .then((response) => {
        console.log("loaded response : ", response);
        setIsIdChecked(true);
        alert("사용 가능한 ID입니다.");
      })
      .catch((error) => {
        console.log(error.response);
        setIsIdChecked(false);
        alert("이미 사용중인 ID입니다.");
      });
  }

  const onFinish = async (values) => {
    console.log('User Input :', values);
    try {
      const response = await axios.post(registerUrl, {
        username: values.username,
        password1: values.password,
        password2: values.confirm_password,
        last_name: values.last_name,
      },
        { withCredentials: true }
      );
      if (response.status === 201) {
        console.log("loaded response : ", response);
        console.log("register success");
        window.location.href = "/login";
      } else {
        console.log("Register failed");
      }
    }
    catch (error) {
      console.log(error.response);
      alert("Register Failed");
    }
  }

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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            maxWidth: 600,
            margin: "auto",
          }}
          autoComplete="off"
        >

          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="이름 (name)" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ validator: idValidator }]}
            style={{ width: "80%", display: "inline-block" }}
          >
            <Input
              placeholder="아이디 (ID)"
              // onChange={handleIdChange}
              onChange={() => (setIsIdChecked(false))}
            />
          </Form.Item>

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
              onClick={idDuplicateCheck}
              style={{
                marginLeft: "3.5%",
                display: "inline-block",
                borderColor: "rgba(255, 255, 255)"
              }}
            >
              ID 중복확인</Button>
          </ConfigProvider>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="비밀번호 (Password)"
              type="password"
            />
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
            <Input
              placeholder="비밀번호 확인 (Confirm Password)"
              type="password"
            />
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