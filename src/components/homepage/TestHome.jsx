import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SendOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu, Button, Input, Row, Col } from "antd";
  import React from "react";
  const { Header, Content, Sider } = Layout;
  
  const TestHome = () => (
    <Layout>
      <Sider>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={[
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined,
            UserOutlined,
          ].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }))}
        />
      </Sider>
      <Layout>
      <Header
          className="site-layout-sub-header-background"
          
        />
        <Header
          style={{ position: "fixed", zIndex: 1, width: "100%", padding: 0 }}
        >
          <div className="site-layout-sub-header-background" />
          <Menu
            theme="white"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>
  
        <Content
          style={{
            margin: "2rem 1.5rem 1rem 3rem",
            paddingRight: "2.5rem",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 580, // 360
              borderRadius: "1.5rem",
            }}
          >
            content
          </div>
        </Content>
        <Row gutter={24}>
          <Col offset={1} span={21}>
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
              style={{ borderRadius: "1.5rem" }}
            />
          </Col>
          <Col span={1}>
            <Button type="primary" shape="circle" icon={<SendOutlined />} />
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
  
  export default TestHome;
  