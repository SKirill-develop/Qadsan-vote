import { Container, Row, Col } from "react-bootstrap";
import Connect from "../Connect/Connect";

const Wallet = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h1>Wallet</h1>
        </Col>
        <Col></Col>
      </Row>
      <Connect />
    </Container>
  );
};

export default Wallet;
