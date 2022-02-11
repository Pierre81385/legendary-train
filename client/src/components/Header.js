import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../utils/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";

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
      color: "white",
    },
    spacer: {
      color: "white",
    },
    header: {
      position: "fixed",
      top: 0,
      width: "100vw",
      zIndex: "999",
      whiteSpace: "nowrap",
    },
  };

  const logout = (event) => {
    event.preventDefault();

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
          <div>
            {!Auth.loggedIn() ? (
              <>
                <Link style={style.firstLink} to="/login">
                  LOGIN
                </Link>
                <span style={style.spacer}>|</span>
                <Link style={style.link} to="/signup">
                  SIGN UP
                </Link>
              </>
            ) : (
              <>
                <Link style={style.firstLink} to="/">
                  HOME
                </Link>
                <span style={style.spacer}>|</span>

                <Link style={style.link} to="/list">
                  FIND GARAGE SALES
                </Link>
                <span style={style.spacer}>|</span>

                <Link style={style.link} to="/login" onClick={logout}>
                  LOGOUT
                </Link>
              </>
            )}
          </div>
        </Col>
        <Col className="col-1"></Col>
      </Row>
    </header>
  );
};

export default Header;
