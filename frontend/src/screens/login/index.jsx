import React, { useState } from "react";
import "./login.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    let updatedValue = { ...values };
    updatedValue[e.target.name] = e.target.value;
    setValues(updatedValue);
  };
  const navigate = useNavigate();
  const handleLogin = async () => {
    await fetch("https://payment-pccw.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // This will show the actual response data
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
          navigate("/planselection");
        } else {
          notify();
        }
      });
  };
  const notify = () => {
    console.log("in not");
    toast("Error in details!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div className="h-screen flex items-center bg-[#1e4c91]">
      <ToastContainer />
      <div className="mx-auto max-w-[400px] bg-white flex flex-col h-fit p-[3%] rounded-xl gap-4 w-[80%]">
        <h1 className="w-fit mx-auto font-bold text-lg">
          Login to your account
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="remember" />

          <label htmlFor="remember">Remember Me</label>
        </div>
        <button
          className="bg-[#1e4c91] text-white p-2 rounded-md mb-3"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center">
          New to MyApp?{" "}
          <a href="/register" className="text-[#1e4c91] font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
