import { Row, Col } from 'antd';
import InputWallet from "../Input-Wallet/Input-Wallet"

const Wallet = () => {
  return (
    <>
      <Row>
        <Col span={5}></Col>
        <Col span={15}>
          <h1>Wallet</h1>
          
          <InputWallet />
        </Col>
        <Col span={3}></Col>
      </Row>
    </>
  );
};

export default Wallet;
