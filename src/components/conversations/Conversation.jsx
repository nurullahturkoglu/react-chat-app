import React, { useEffect, useState } from "react";
import "./conversation.css";
const axios = require("axios");

export default function Conversation({ownUser, members ,currentUser , onClick}) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      members?.forEach((element) => {
        if (element !== currentUser?._id) {
          axios
            .get(`http://localhost:4000/login/${element}`)
            .then((res) => {
              setUserInfo(res.data);
            })
            .catch((err) => console.log(err));
        }
      });
    };
    getUserInfo();
  }, []);

  return (
    <div onClick={onClick}>
      <div className="conversation">
        <img
          className="conversation-image"
          src={require("../../images/avatar.png")}
          alt="avatar"
        />
        <span className="conversation-label">{ ownUser ? currentUser?.fullName + " - Current User" : userInfo?.fullName}</span>
      </div>
    </div>
  );
}
