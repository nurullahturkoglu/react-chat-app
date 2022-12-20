import React, { useState, useEffect, useRef } from "react";
import Conversation from "../conversations/Conversation";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";
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
    const user = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        "Authorization": 'Bearer ' + user.token,
        "userId":user._id,
      },
    };

    axios
      .get(`http://localhost:4000/login/${user._id}`,config)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [navigator]);

  useEffect(() => {
    // FROM CURRENT USER TO ALL CONTACT LIST  -> STATE

    currentUser?._id &&
      axios
        .get(`http://localhost:4000/conversation/${currentUser._id}`)
        .then((res) => {
          const conversations = res.data;
          // sort timestap
          conversations.sort(function(a, b){return new Date(b.updatedAt).getTime() -  new Date(a.updatedAt).getTime()});
          console.log(conversations)
          setContactList(conversations);
        })
        .catch((err) => console.log(err));
  }, [currentUser]);

  useEffect(() => {
    // DIRECT MESSAGE ON SOCKET
    currentUser && socket.current.emit("sendUserInfo", currentUser._id);
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
    // SHOW MESSAGE ON CLIENT
    if(directMessage && currentContact.members?.includes(directMessage.senderId) ){
      setMessages((messages) => [...messages, directMessage])
      setContactList(prevContactList => [currentContact,...prevContactList.filter(contact => contact !== currentContact)])
    }
  }, [directMessage, currentContact]);

  useEffect(() => {
    // SET SCROLL TO MESSAGES END
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = (conversation) => {
    setCurrentContact(conversation);
  };

  const handleCurrentUser = () => {};

  const handleLogout = () => {
    //User Logout Function
    localStorage.removeItem("user");
    navigator("/");
  };

  const searchFriend = (value) => {
    // Search Friend Function
    const searchedUser = {
      username: value,
    };

    if (searchedUser.username.trim() === "") {
      return message.error("Bu alani boş bırakamazsiniz");
    }

    if (currentUser && currentUser.username === searchedUser.username) {
      return message.error("Kendinize mesaj gönderemezsiniz!");
    }

    axios
      .post("http://localhost:4000/login/", searchedUser)
      .then((data) => {
        if (!data.data) {
          return message.error("Kullanici bulunamadi!");
        }

        // CHECK CURRENT USER'S CONTACT LIST
        // IF SEARCHED USER IN THIS LIST
        // THEN GIVE ERROR

        let isExistOnContact = false;
        contactList.forEach((value) => {
          value.members?.forEach((value) => {
            if (value === data.data._id) {
              isExistOnContact = true;
            }
          });
        });

        if (isExistOnContact) {
          return message.warning(
            "Bu kullanici zaten mesajlaşma listenizde mevcut!"
          );
        }

        // IF WE HAVE NOT ANY PROBLEM THEN ADD A NEW USER IN CONTACT LIST

        const newContact = {
          senderId: currentUser._id,
          receiverId: data.data._id,
        };

        axios
          .post("http://localhost:4000/conversation", newContact)
          .then((data) => {
            // SET CONTACT LIST FOR PREVIEW
            setContactList((prevList) => {
              return [...prevList, data.data];
            });
          });
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
            spellCheck="false"
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
                setContactList={setContactList}
                setMessages={setMessages}
                spellCheck="false"
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
