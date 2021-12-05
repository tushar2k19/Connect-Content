import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from 'next/link'
import Router from 'next/router'
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import axios from "axios";
import { API } from "../config";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { email, password, error, success, buttonText } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Logging In" });

    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });
      console.log(response)
      setState({
        ...state,
        email: "",
        password: "",
        buttonText: "Logged In",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Login",
        error: error.response.data.error,
      });
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control mb-3"
          placeholder="Type your email"
          required
        />
      </div>
      <div className="form-group">
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control mb-3"
          placeholder="Type your password"
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-danger">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1>Login</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <br />
        {loginForm()}
      </div>
    </Layout>
  );
};

export default Login;
