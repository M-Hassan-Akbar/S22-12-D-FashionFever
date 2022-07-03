// import logo from './logo.svg';
import "./App.css";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import axios from "axios";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Fashion Fever</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

const Prompt = (params) => {
  const [useDrop, setUseDrop] = useState(false);
  const [captions, setCaptions] = useState("");
  const [category, setCategory] = useState("");
  const [sleeves, setSleeves] = useState("");
  const [color, setColor] = useState("");

  const sendReq = (
    e,
    useDrop,
    captions,
    category,
    sleeves,
    color,
    setFetchImage,
    setImages
  ) => {
    e.preventDefault();

    var sendText = "";
    var sText;
    if (!useDrop) {
      sendText = captions;
      sText = JSON.parse(`{"caption": "${sendText}"}`);
    } else {
      var text1 = " ";
      if (sleeves !== "Sleeveless" && sleeves !== "") text1 = " sleeves ";
      sendText = color + " " + sleeves + text1 + category;
      sText = JSON.parse(`{"caption": "${sendText}"}`);
    }
    axios.post("http://localhost:5000/fashion", sText).then((res) => {
      setImages(res.data);
      setFetchImage(true);
      console.log(res.data);
    });
  };

  return (
    <div style={{ padding: "50px" }}>
      <Form>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter description"
            disabled={useDrop}
            onChange={(e) => setCaptions(e.target.value)}
          />
          <Form.Text className="text-muted">
            Description of desired clothing design.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Details">
          <Form.Check
            type={"checkbox"}
            label={"Use dropdown"}
            id={"use-dropdown"}
            onChange={(e) => setUseDrop(e.target.checked)}
          />
          <br />
          <Form.Label>Category</Form.Label>
          <Form.Select
            disabled={!useDrop}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option></option>
            <option>Shirt</option>
            <option>Blazer</option>
          </Form.Select>
          <br />
          <Form.Label>Sleeves</Form.Label>
          <Form.Select
            disabled={!useDrop}
            onChange={(e) => setSleeves(e.target.value)}
          >
            <option></option>
            <option>Full</option>
            <option>Half</option>
            <option>Sleeveless</option>
          </Form.Select>
          <br />
          <Form.Label>Color</Form.Label>
          <Form.Select
            disabled={!useDrop}
            onChange={(e) => setColor(e.target.value)}
          >
            <option></option>
            <option>Blue</option>
            <option>Black</option>
            <option>White</option>
            <option>Pink</option>
            <option>Yellow</option>
            <option>Grey</option>
            <option>Green</option>
            <option>Red</option>
            <option>Purple</option>
            <option>Brown</option>
          </Form.Select>
        </Form.Group>
        <Button
          variant="primary"
          type="Button"
          onClick={(e) =>
            sendReq(
              e,
              useDrop,
              captions,
              category,
              sleeves,
              color,
              params.setFetchImage,
              params.setImages
            )
          }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

const Images = (params) => {
  const container_style = {};
  const g_container_style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex_direction: "row",
  };
  return (
    <div className="image-container">
      <div className="g-container" style={g_container_style}>
        <img
          src={"http://localhost:5000/" + params.images.fashion.small}
          height="64"
          width="64"
        />
        <img
          src={"http://localhost:5000/" + params.images.fashion.medium}
          height="128"
          width="128"
        />
        <img
          src={"http://localhost:5000/" + params.images.fashion.large}
          height="256"
          width="256"
        />
      </div>
      <div className="attn-container" style={g_container_style}>
        <img src={"http://localhost:5000/" + params.images.fashion.map1} />
      </div>
      <div className="attn-container" style={g_container_style}>
        <img src={"http://localhost:5000/" + params.images.fashion.map2} />
      </div>
    </div>
  );
};

function App() {
  const [fetchImage, setFetchImage] = useState(false);
  const [images, setImages] = useState("");

  return (
    <>
      <NavBar />
      {fetchImage && <Images images={images} />}
      <Prompt setFetchImage={setFetchImage} setImages={setImages} />
    </>
  );
}

export default App;
