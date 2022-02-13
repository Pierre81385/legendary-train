//Required: inputs for name, email, password, and button to submit
//Optional: avatar image upload, address, and phone number

//Create User Account

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/Mutations";
import { Form, Button, Col, Row } from "react-bootstrap";

import Auth from "../utils/Auth";

const Signup = () => {
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
    name: "",
    email: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log(formState);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <Row style={{ height: "33vh" }}></Row>
      <Row>
        <Col className="col-sm-1 col-md-2 col-lg-4"></Col>
        <Col className="col-12 col-sm-10 col-md-8 col-lg-4" align="center">
          <div className="card" style={style.card}>
            <h4 className="card-header text-light border-0 p-2">Sign Up</h4>
            <div className="card-body" style={style.container}>
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/shop">back to the homepage.</Link>
                </p>
              ) : (
                <Form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Your name"
                    name="name"
                    type="text"
                    style={style.input}
                    value={formState.name}
                    onChange={handleChange}
                  />
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
                    placeholder="Address Line 1"
                    name="streetAddress1"
                    type="text"
                    style={style.input}
                    value={formState.streetAddress1}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Address Line 2"
                    name="streetAddress2"
                    type="text"
                    style={style.input}
                    value={formState.streetAddress2}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="City"
                    name="city"
                    type="text"
                    style={style.input}
                    value={formState.city}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="State"
                    name="state"
                    type="text"
                    style={style.input}
                    value={formState.state}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Zipcode"
                    name="zipcode"
                    type="number"
                    style={style.input}
                    value={formState.Zipcode}
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
              )}

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

export default Signup;
