import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { classes } from "istanbul-lib-coverage";
import mainBackground from "../src/assets/mainBackground.mp4";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import List from "./pages/List";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const style = {
    video: {
      position: "fixed",
      zIndex: "-1",
      objectFit: "cover",
      width: "100vw",
      height: "100vh",
      top: "0",
      left: "0",
    },
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Container fluid>
          <video
            autoPlay="autoplay"
            loop="loop"
            muted
            playsInline
            className={classes.Video}
            style={style.video}
          >
            <source src={`${mainBackground}`} type="video/mp4" />
          </video>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/Catalog">
                <Catalog />
              </Route>
              <Route exact path="/list">
                <List />
              </Route>
            </Col>
          </Row>
          <Row>
            <Col>
              <Footer />
            </Col>
          </Row>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;