import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
      .then((res) => {
        navigate("/");
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("error");
        }
      });
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-login">
      <h4>Welcome! Enter your email and password to continue</h4>
      <div className="example-user">
        <h5>Test Data</h5>
        <p className="name__user-email">Email: mason@gmail.com</p>
        <p className="password-email">Password: mason1234</p>
      </div>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log out
        </Button>
      </Form>
    </div>
  );
};

export default Login;
