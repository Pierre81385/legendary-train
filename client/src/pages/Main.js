//Required: "about" information.  The homepage.
import { Container, Row, Col, Card } from "react-bootstrap";

const Main = () => {
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
    title: {
      fontFamily: "'Finger Paint', cursive",
      fontSize: "50px",
    },
  };
  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Container style={style.container} fluid>
        <Row style={{ height: "33vh" }}></Row>

        <Row>
          <Col className="col-1 col-sm-2 col-md-4"></Col>
          <Col className="col-10 col-sm-8 col-md-4">
            <Card style={style.card}>
              <Card.Title style={style.title}>WELCOME!</Card.Title>

              <ul>
                <li>
                  <h4>
                    Click the "FIND" button to see active yard sales, or
                    "SIGNUP" to post your own.
                  </h4>
                </li>
                <li>
                  <h4>
                    After you signup with your name, email, and address, all of
                    this information will apear in the yardsale list. Visitors
                    to the site will see a map to your location, have the
                    ability to email you, and can view any items you choose to
                    post.
                  </h4>
                </li>
                <li>
                  <h4>
                    After signing up your catalog of items will be empty, so go
                    ahead and add some by clicking "POST" and filling out the
                    form.
                  </h4>
                </li>
                <li>
                  <h4>
                    If you need to change any post information, or want to
                    remove it, navigate to the item and you will have options to
                    update or delete the item. Each item is tied to your user
                    account, so you can't change other peoples items.
                  </h4>
                </li>
              </ul>
            </Card>
          </Col>
          <Col className="col-1 col-sm-2 col-md-4"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
