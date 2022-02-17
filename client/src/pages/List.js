//Required: list of all active garage sales.  When a user clicks
//on one the catalog component retrives the associated items and displays
//List items will display username and address

import React, { useState, useEffect, initialState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { QUERY_USERS } from "../utils/Queries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/Auth";
import { useHistory } from "react-router-dom";

const List = () => {
  const style = {
    card: {
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "25px",
      marginBottom: "25px",
      boxShadow: "0 15px 25px rgba(129, 124, 124, 0.2)",
      borderRadius: "5px",
      padding: "10px",
      textAlign: "center",
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderColor: "white",
      color: "white",
    },
    link2: {
      color: "white",
    },
    mapouter: {
      position: "relative",
      textAlign: "right",
      height: "50%",
      width: "100%",
    },
    gmap_canvas: {
      overflow: "hidden",
      background: "none!important",
      height: "50%",
      width: "100%",
      textAlign: "center",
    },
  };

  const { loading, data } = useQuery(QUERY_USERS);
  const user = data?.users || {};
  console.log(user);

  const userArray = [];

  for (var i = 0; i < user.length; i++) {
    const aUser = Array.isArray(user) && user.length ? user[i] : {};
    userArray.push(aUser);
  }

  const [users, addUsers] = useState({
    name: "",
    email: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Re-rendered ${count} times`);
  });

  const history = useHistory();

  const mkAddress = (u) => {
    var address = `${u.streetAddress1} ${u.city} ${u.state} ${u.zipcode}`;
    console.log(encodeURI(address));
    return encodeURI(address);
  };

  const renderList = (user) => {
    return (
      <Card style={style.card} key={user.id}>
        <Card.Title>{user.name}'s Yard Sale</Card.Title>
        <div style={style.mapouter}>
          <div style={style.gmap_canvas}>
            <iframe
              width="600"
              height="500"
              id="gmap_canvas"
              src={`https://maps.google.com/maps?q=${mkAddress(
                user
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              frameBorder="0"
              scrolling="yes"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </div>
        </div>
        <Card.Text>
          Address: {user.streetAddress1}
          <span> </span>
          {user.streetAddress2}
          <span> </span>
          {user.city}
          <span> </span>
          {user.state}
          <span> </span>
          {user.zipcode}
        </Card.Text>

        <Card.Text>
          Email:
          <span> </span>
          <a
            href="#"
            onClick={() => {
              window.location = "mailto:" + user.email;
            }}
            style={style.link2}
          >
            {user.email}
          </a>
        </Card.Text>
        <Card.Footer>
          <Button
            id="addCart"
            variant="outline-light"
            onClick={() => {
              localStorage.setItem("id", user._id);
              history.push("/catalog");
            }}
          >
            VIEW
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Container style={style.container} fluid>
        <Row style={{ height: "33vh" }}></Row>

        <Row>
          <Col className="col-1 col-sm-2 col-md-4"></Col>
          <Col className="col-10 col-sm-8 col-md-4">
            {userArray.map(renderList)}
          </Col>
          <Col className="col-1 col-sm-2 col-md-4"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;
