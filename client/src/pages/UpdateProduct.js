import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_SINGLE_PRODUCT } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../utils/Mutations";

import Auth from "../utils/Auth";
import { Link, useHistory } from "react-router-dom";

function UpdateProduct() {
  const style = {
    container: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%", // make sure the parent is full screen
      height: "100%", // so that the content will center correctly
      paddingTop: "25px",
      paddingBottom: "25px",
    },
    input: {
      width: "100%",
      padding: "12px 20px",
      margin: "8px 0",
      boxSizing: "border-box",
    },
    card: {
      margin: "0 auto",
      float: "none",
      marginBottom: "10px",
    },
    button: {
      marginLeft: "10px",
    },
    img: {
      marginTop: "30px",
      width: "300px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };
  //get vales of product to be updated from localstorage
  let updateProductName = localStorage.getItem("nameOfUpdateProduct");
  let updateProductImage = localStorage.getItem("imageOfUpdateProduct");
  let updateProductDesc = localStorage.getItem("descOfUpdateProduct");
  let updateProductPrice = localStorage.getItem("priceOfUpdateProduct");
  let updateProductQuantity = localStorage.getItem("quantityOfUpdateProduct");

  //set state with initial values
  const [formState, setFormState] = useState({
    image: updateProductImage,
    name: updateProductName,
    desc: updateProductDesc,
    price: updateProductPrice,
    quantity: updateProductQuantity,
    user: localStorage.getItem("currentId"),
  });

  const [updateProduct, { error, data }] = useMutation(UPDATE_PRODUCT);

  //update state with new values when they're changed
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log("handleChange called to set form state: " + name + value);
  };

  //submit run find and update
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = updateProduct({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const history = useHistory();
  const handleClick = () => history.push("/catalog");

  return (
    <main className="flex-row justify-center mb-4 text-center">
      <Row style={{ height: "33vh" }}> </Row>

      <Row>
        <Col className="col-sm-1 col-md-2 col-lg-4"></Col>
        <Col className="col-12 col-sm-10 col-md-8 col-lg-4" align="center">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">
              Update Product
            </h4>
            <img src={formState.image} style={style.img}></img>
            <div className="card-body" style={style.container}>
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link onClick={handleClick()}>back to your catalog.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Image URL"
                    name="image"
                    type="text"
                    style={style.input}
                    value={formState.image}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Product Name"
                    name="name"
                    type="text"
                    style={style.input}
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Product Description"
                    name="desc"
                    type="text"
                    style={style.input}
                    value={formState.desc}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Price (Numbers Only"
                    name="price"
                    type="text"
                    style={style.input}
                    value={formState.price}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Quantity (Numbers Only)"
                    name="quantity"
                    type="text"
                    style={style.input}
                    value={formState.quantity}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-dark"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Update
                  </Button>
                  <Link
                    className="btn btn-outline-dark"
                    style={style.button}
                    to="/manageproduct"
                  >
                    Cancel
                  </Link>
                </form>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
}

export default UpdateProduct;
