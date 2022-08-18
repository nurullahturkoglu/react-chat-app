import { Button, Form, Input, Select, Row, Col, message } from "antd";
import { EditOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
const axios = require("axios");
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const success = () => {
    message.success("Kayıt başarılı , yönlendiriliyorsunuz");
  };
  const error = () => {
    message.error("Kayıt başarısız");
  };

  const onFinish = (values) => {
    const user = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      phone: "0" + values.phone,
      password: values.password,
    };

    axios
      .post("http://localhost:4000/login/sign-up", user)
      .then((response) => {
        console.log(response.data);
        success();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        error();
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="90">+90</Option>
      </Select>
    </Form.Item>
  );

  const renderRegister = (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      className="register-form"
      onFinish={onFinish}
      initialValues={{
        prefix: "90",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="fullName"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your Full Name!",
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
          placeholder={"Phone Number"}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<EditOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<EditOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Register
        </Button>
        <hr />
        Or <Link to="/">go to login</Link>
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
        <Col>{renderRegister}</Col>
      </Row>
    </div>
  );
};

export default RegisterForm;
