import React, { useState, useEffect, useRef } from "react";
import Conversation from "../conversations/Conversation";
import { useNavigate } from "react-router-dom";
import { Input ,message} from "antd";
import "./home.css";
import Message from "../messages/Message";
import SendMessage from "../messages/SendMessage";
const io = require("socket.io-client");
const { Search } = Input;
const axios = require("axios");

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [directMessage, setDirectMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchedFriend, setSearchedFriend] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const navigator = useNavigate();

  useEffect(() => {
    socket.current = io("ws://localhost:4001");
    // GET DIRECT MESSAGES
    socket.current.on("sendMessage", (data) => {
      setDirectMessage({
        senderId: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    // GET CURRENT USER
    if (!localStorage.getItem("user")) {
      navigator("/");
    }

    // SET CURRENT USER
    const name = JSON.parse(localStorage.getItem("user"));
    const user = { username: name };

    axios
      .post("http://localhost:4000/login", user)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [navigator]);

  useEffect(() => {
    // FROM CURRENT USER TO ALL CONTACT LIST  -> STATE
    const currUserId = currentUser?._id;
    currentUser?._id &&
      axios
        .get(`http://localhost:4000/conversation/${currUserId}`)
        .then((res) => {
          const conversations = res.data;
          setContactList(conversations);
        })
        .catch((err) => console.log(err));
  }, [currentUser]);

  useEffect(() => {
    // DIRECT MESSAGE ON SOCKET
    currentUser && socket.current.emit("sendUserInfo", currentUser._id);
    socket.current.on("activeUserList", (data) => {
    });
  }, [currentUser]);

  useEffect(() => {
    // SET CURRENT CONTACT
    axios
      .get(`http://localhost:4000/message/${currentContact?._id}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentContact]);

  useEffect(() => {
    if(searchedFriend && searchedFriend._id === currentUser._id){
      message.error("Kendinizi konuşma listesine ekleyemezsiniz")
      return
    }
    contactList.forEach(element => {
      if(element.members.includes(searchedFriend?._id)){
        message.warning("Bu kişiyle zaten mevcut konuşmanız bulunmakta")
        return
      }
    })

  },[searchedFriend,currentUser,contactList])

  useEffect(() => {
    // SHOW MESSAGE ON CLIENT
    directMessage &&
      currentContact.members?.includes(directMessage.senderId) &&
      setMessages((messages) => [...messages, directMessage]);
  }, [directMessage, currentContact]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = (conversation) => {
    setCurrentContact(conversation);
  };

  const handleCurrentUser = () => {};

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigator("/");
  };

  const searchFriend = (value) => {
    // if searched user in contact list then give err message
    const userInfo = {
      username: value,
    };

    axios
      .post(`http://localhost:4000/login`, userInfo)
      .then((data) => {
        if (data.data) {
          setSearchedFriend(data.data);
        }else{
          message.error("Aradığınız kullanıcı bulunamadi!")
        }
      })
      .catch((err) => console.log(err));
  };

  const renderForm = (
    <div className="messenger">
      <div className="contact-list">
        <div className="contact-wrapper">
          <Conversation
            key={"currentUser"}
            ownUser={true}
            currentUser={currentUser}
            onClick={() => handleCurrentUser(currentUser?._id)}
          />
          <hr />
          <Search
            placeholder="Search your friends!"
            className="contact-input"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={searchFriend}
          />
          {contactList?.map((element, index) => {
            return (
              <Conversation
                key={index}
                ownUser={false}
                members={element.members}
                currentUser={currentUser}
                onClick={() => handleClick(element)}
              />
            );
          })}
        </div>
      </div>
      <div className="messages-list">
        {!currentContact ? (
          <div className="no-conversation">
            <h2>You can start conversation with your friends!</h2>
          </div>
        ) : (
          <div className="messages-wrapper">
            <div className="messages-text-area">
              {messages?.map((element, index) => {
                return (
                  <div key={index} ref={scrollRef}>
                    <Message
                      key={index}
                      senderId={element.senderId}
                      text={element.text}
                      currentUserId={currentUser?._id}
                    />
                  </div>
                );
              })}
            </div>
            <div className="messages-send">
              <SendMessage
                socket={socket}
                currentContact={currentContact}
                currentUser={currentUser}
                messages={messages}
                setMessages={setMessages}
              />
            </div>
          </div>
        )}
      </div>
      <div className="menu-list">
        <div className="menu-items">
          <h1 onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </h1>
          <h1>Profile</h1>
          <h1>Settings</h1>
          <h1>Layout</h1>
        </div>
      </div>
    </div>
  );

  return <>{renderForm}</>;
};

export default Home;
