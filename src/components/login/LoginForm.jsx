import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect } from "react";
const axios = require("axios");

const LoginForm = ({ user, setUser }) => {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigator("/home");
    }
  });

  const navigate = useNavigate();
  const success = () => {
    message.success("Giriş başarılı , yönlendiriliyorsunuz");
  };
  const error = () => {
    message.error("Giriş başarısız");
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const user = {
      username: values.username,
      password: values.password,
    };

    axios
      .post("http://localhost:4000/login/sign-in", user)
      .then((response) => {
        //setState ile kullanıcı adını state'e alma
        localStorage.setItem("user", JSON.stringify(user.username));

        // success message
        success();
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      })
      .catch((err) => {
        error();
        console.log(err);
      });
  };

  const renderForm = (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!", 
          },
        ]}
      >
        <Input
          style={{ borderRadius: "1.2rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          style={{ borderRadius: "1.2rem" }}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link to="#">Forgot Password</Link>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ margin: "1rem" }}
        >
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );

  return (
    <div className="login-form-container">
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col>{renderForm}</Col>
      </Row>
    </div>
  );
};

export default LoginForm;
