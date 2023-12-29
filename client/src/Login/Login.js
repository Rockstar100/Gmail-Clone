import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async (e)  => {
        e.preventDefault();
        const values = {
            email: email,
            password: password,
        };

        try {
           
            const res = await axios.post('http://localhost:8000/login', values);
            if(res.data.success){
                localStorage.setItem("token", res.data.token);

                message.success("Login Successfull");
                navigate.push('/');
            } else {
                message.error(res.data.message);
            }
        } catch(error) {
            
            console.log(error);
            message.error("Invalid Credentials");
        }
    };


  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={submitHandler}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="email" name="email"  placeholder="Email" />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} id="password" name="password" placeholder="Password" />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember me
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="/SignUp">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;