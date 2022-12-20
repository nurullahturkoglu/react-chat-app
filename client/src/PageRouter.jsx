import React from "react";
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


  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </Router>
  )
}

export default PageRouter