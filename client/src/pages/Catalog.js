//view showing all items for a garage sale
import React, { useState, useEffect, initialState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_PRODUCTS, QUERY_USERBYEMAIL } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DELETE_PRODUCT } from "../utils/Mutations";

const Catalog = () => {
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
      borderColor: "white",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    button: {
      marginLeft: "5px",
      marginRight: "5px",
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
  };

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

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: QUERY_PRODUCTS }],
  });

  const renderCard = (oneProduct) => {
    return (
      <Card style={style.card} key={oneProduct.id}>
        <Card.Img
          variant="top"
          src={oneProduct.image}
          style={style.img}
          className="img-responsive center-block"
        />

        <Card.Body>
          <Card.Title>{oneProduct.name}</Card.Title>
          <Card.Text>{oneProduct.desc}</Card.Text>

          <p>${oneProduct.price}</p>
          <p>Quantity Availible: {oneProduct.quantity}</p>
        </Card.Body>
        <Card.Footer className="text-center" style={{ paddingTop: "10px" }}>
          {oneProduct.user._id != localStorage.getItem("currentId") ? (
            <>
              <Link className="btn btn-outline-light" to="/login">
                Login to Change
              </Link>
            </>
          ) : (
            <>
              <Link
                className="btn btn-outline-light"
                style={style.button}
                to="/updateproduct"
                onClick={() => {
                  console.log(typeof oneProduct._id);
                  //save name of product to be updated to local storage.
                  localStorage.setItem("idOfUpdateProduct", oneProduct._id);

                  localStorage.setItem(
                    "imageOfUpdateProduct",
                    oneProduct.image
                  );
                  localStorage.setItem("nameOfUpdateProduct", oneProduct.name);
                  localStorage.setItem("descOfUpdateProduct", oneProduct.desc);
                  localStorage.setItem(
                    "priceOfUpdateProduct",
                    oneProduct.price
                  );
                  localStorage.setItem(
                    "quantityOfUpdateProduct",
                    oneProduct.quantity
                  );
                }}
              >
                Update
              </Link>
              <Button
                variant="outline-light"
                style={style.button}
                onClick={() => {
                  deleteProduct({ variables: { name: oneProduct.name } });
                }}
              >
                Delete
              </Button>
            </>
          )}
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
            {productArray.map(renderCard)}
          </Col>
          <Col className="col-1 col-sm-2 col-md-4"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Catalog;
