import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/homepage/Home";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/login/RegisterForm";
import ErrorPage from "./components/login/ErrorPage"

function PageRouter() {

  const [user,setUser] = useState([]);

  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginForm user={user} setUser={setUser}/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/home" element={<Home user={user} setUser={setUser}/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </Router>
  )
}

export default PageRouter