import React from "react";
import "./message.css";

export default function Message({ senderId , text ,currentUserId }) {

  return (
    <div className={senderId !== currentUserId ? "message-content" : "message-content own"}>
      <img
        className="message-image"
        src={require("../../images/avatar.png")}
        alt="avatar"
      />
      <p className={senderId !== currentUserId ? "message-text" : "message-text own"}>
        {text}
      </p>
    </div>
  );
}
