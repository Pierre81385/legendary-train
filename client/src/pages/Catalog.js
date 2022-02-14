//view showing all items for a garage sale
import React, { useState, useEffect, initialState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_PRODUCTS, QUERY_USERBYEMAIL } from "../utils/Queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Catalog = () => {
  const style = {};

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const product = data?.products || {};

  const productArray = [];

  for (var i = 0; i < product.length; i++) {
    const aProduct = Array.isArray(product) && product.length ? product[i] : {};

    console.log(aProduct.user._id);

    const currentUserId = localStorage.getItem("id");
    if (aProduct.user._id === currentUserId) {
      productArray.push(aProduct);
    }
  }

  const renderCard = (oneProduct) => {
    return (
      <Col>
        <Card style={style.card} key={oneProduct.id}>
          <Card.Img
            variant="top"
            src={oneProduct.image}
            className="img-responsive center-block"
          />
          <Card.Body>
            <Card.Title>{oneProduct.name}</Card.Title>
            <Card.Text>{oneProduct.desc}</Card.Text>
            <p>${oneProduct.price}</p>
            <p>Quantity Availible: {oneProduct.quantity}</p>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Container style={style.container} fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          {productArray.map(renderCard)}
        </Row>
      </Container>
    </div>
  );
};

export default Catalog;
