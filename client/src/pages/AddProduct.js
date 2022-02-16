//Add Products

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/Mutations";
import { Link, useHistory } from "react-router-dom";
import { QUERY_PRODUCTS } from "../utils/Queries";
import { Form, Button, Col, Row } from "react-bootstrap";

const AddProduct = () => {
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
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",

      borderColor: "white",
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

  //Setting input form to have blank values.
  const [formState, setFormState] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    quantity: "",
    user: localStorage.getItem("currentId"),
  });
  const [addProduct, { error, data }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: QUERY_PRODUCTS }],
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("image URL " + formState.image);
  });

  // submit form and send input values to DB to create a new Product
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    formState.user = localStorage.getItem("currentId");

    try {
      const { data } = await addProduct({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    setFormState({
      image: "",
      name: "",
      desc: "",
      price: "",
      quantity: "",
      user: localStorage.getItem("currentId"),
    });

    localStorage.setItem("loadProduct", "TRUE");
  };

  const history = useHistory();
  const handleClick = () => history.push("/catalog");

  return (
    <main className="flex-row justify-center mb-4 text-center">
      <Row style={{ height: "33vh" }}> </Row>

      <Row>
        <Col className="col-sm-1 col-md-2 col-lg-4"></Col>
        <Col className="col-12 col-sm-10 col-md-8 col-lg-4" align="center">
          <div className="card" style={style.card}>
            <h4 className="card-header text-light p-2">Add Product</h4>
            <img src={formState.image} style={style.img}></img>
            <div className="card-body" style={style.container}>
              {data ? (
                <p>
                  Success! You may now{" "}
                  <Link onClick={handleClick()}>go back to your catalog.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {/* <label for="imageFile">Upload a photo of yourself:</label>
                  <input
                    type="file"
                    id="imageFile"
                    //value={formState.image}
                    //onChange={handleImage}
                    capture="environment"
                    accept="image/*"
                  ></input> */}
                  <input
                    className="form-input"
                    placeholder="Image URL, sucessful link will display an image preview"
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
                    type="number"
                    style={style.input}
                    value={formState.price}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Quantity (Numbers Only)"
                    name="quantity"
                    type="number"
                    style={style.input}
                    value={formState.quantity}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-light"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Upload to Database
                  </Button>
                  <Link
                    className="btn btn-outline-light"
                    style={style.button}
                    to="/"
                  >
                    Cancel
                  </Link>
                </form>
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

export default AddProduct;
