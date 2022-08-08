import React from "react";
import { Button, Form, Input , message} from "antd";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";

export default function SendMessage({
  socket,
  currentContact,
  currentUser,
  messages,
  setMessages,
}) {
  const [form] = Form.useForm();

  const handleFormEvent = (values) => {
    if (values.sendMessage.trim() === ""){
      message.error("Boş mesaj gönderemezsiniz");
      return;
    }
    form.resetFields();
    const messageJson = {
      conversationId: currentContact?._id,
      senderId: currentUser?._id,
      text: values.sendMessage,
    };

    const receiverId = currentContact?.members.find(
      (userid) => userid !== currentUser?._id
    );

    socket.current.emit("getMessage", {
      senderId: currentUser?._id,
      receiverId: receiverId,
      text: values.sendMessage,
    });

    axios
      .post("http://localhost:4000/message", messageJson)
      .then((res) => {
        setMessages((prevMessages) => [...prevMessages, res.data]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onFinish={handleFormEvent} form={form} style={{ display: "flex" }}>
      <Form.Item name="sendMessage" style={{ width: "90%" }}>
        <Input
          placeholder="Type your message here!"
          style={{ borderRadius: "1.2rem" }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ borderRadius: "1.2rem", marginLeft: "0.5rem" }}
        >
          <SendOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
}
