//Required: input for email, password, and button to submit.
//Optional: error message display, button to "remember me on this computer"

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/Mutations";
import Auth from "../utils/Auth";
import { Form, Button, Col, Row } from "react-bootstrap";

const Login = (props) => {
  const style = {
    container: {
      zIndex: 1,
    },
    input: {
      width: "100%",
      padding: "12px 20px",
      margin: "8px 0",
      boxSizing: "border-box",
    },
    card: {
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: "white",
    },
    button: {
      margin: "25px",
    },
  };

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      //localStorage.setItem("id", data.login.user._id);

      localStorage.setItem("email", formState.email);

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <Row style={{ height: "33vh" }}></Row>
      <Row>
        <Col className="col-sm-1 col-md-2 col-lg-4"></Col>
        <Col className="col-12 col-sm-10 col-md-8 col-lg-4" align="center">
          <div className="card" style={style.card}>
            <h4 className="card-header text-light border-0 p-2">Login</h4>
            <div className="card-body" style={style.container}>
              <Form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  style={style.input}
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  style={style.input}
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button
                  variant="outline-light"
                  style={style.button}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col className="col-sm-1 col-md-2 col-lg-4"></Col>
      </Row>
    </main>
  );
};

export default Login;
