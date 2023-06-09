import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../style/Login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const LoginTest = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://127.0.0.1:5000/auth/signin", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        resp.data.data.user.type == "reader"
          ? navigate("/homeReader")
          : navigate("/home");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <div className="login-container">
      <h1>Login </h1>

      {/*}    {login.err.map((error, index) => (
        <Alert  variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))} */}

      <Form onSubmit={LoginFun} type="login-form">
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100 ms-2"
          variant="primary"
          type="submit"
          disabled={login.loading === true}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginTest;
