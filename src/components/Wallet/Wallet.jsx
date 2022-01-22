import { Row, Col } from 'antd';
import InputWallet from "../Input-Wallet/Input-Wallet"

const Wallet = () => {
  return (
    <>
      <Row>
        <Col flex="auto">
          <h1>Wallet</h1>
          <InputWallet />
        </Col>
      </Row>
    </>
  );
};

export default Wallet;
