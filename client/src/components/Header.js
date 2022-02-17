import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../utils/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button } from "react-bootstrap";

const Header = () => {
  const style = {
    firstLink: {
      marginTop: "15px",
      marginBottom: "15px",
      marginRight: "15px",
      textDecoration: "none",
      color: "white",
    },
    link: {
      marginTop: "15px",
      marginBottom: "15px",
      marginLeft: "15px",
      marginRight: "15px",
      textDecoration: "none",
      color: "black",
    },
    spacer: {
      color: "white",
    },
    header: {
      justifyContent: "center",
      position: "fixed",
      top: 0,
      width: "100vw",
      zIndex: "999",
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      margin: 0,
    },
    h1: {
      fontFamily: "'Finger Paint', cursive",
      fontSize: "80px",
      color: "white",
    },
    button: {
      marginLeft: "15px",
      marginRight: "15px",
    },
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    Auth.logout();
    setLoginStatus(false);
    handleClick();
  };

  const [isLoggedIn, setLoginStatus] = useState(true);

  useEffect(() => {
    console.log("Login status: " + isLoggedIn);
  });

  const history = useHistory();
  const handleClick = () => history.push("/login");

  return (
    <header className="text-dark mb-4 py-3 text-center" style={style.header}>
      <Row>
        <Col className="col-1"></Col>
        <Col className="col-10" align="center">
          <div style={style.nav}>
            {!Auth.loggedIn() ? (
              <>
                <Button
                  id="findNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={() => {
                    history.push("/list");
                  }}
                >
                  FIND
                </Button>
                <Button
                  id="loginNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  LOGIN
                </Button>
                <Button
                  id="signUpNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  SIGNUP
                </Button>
              </>
            ) : (
              <>
                <Button
                  id="homeNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  HOME
                </Button>
                <Button
                  id="findNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={() => {
                    history.push("/list");
                  }}
                >
                  FIND
                </Button>
                <Button
                  id="addNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={() => {
                    history.push("/addproduct");
                  }}
                >
                  POST
                </Button>
                <Button
                  id="logoutNav"
                  variant="outline-light"
                  style={style.button}
                  onClick={logout}
                >
                  LOGOUT
                </Button>
              </>
            )}
          </div>
        </Col>
        <Col className="col-1"></Col>
      </Row>
      <h1 style={style.h1}>YARDSALE</h1>
    </header>
  );
};

export default Header;
