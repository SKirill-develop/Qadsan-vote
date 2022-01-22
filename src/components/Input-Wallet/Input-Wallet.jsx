import React from "react";
import { Input, Space, Row, Col, Divider, List, Typography } from "antd";
import StellarSdk from "stellar-sdk";
import styleInput from "./Input-Wallet.module.css";
import Connect from "../Connect/Connect";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const InputWallet = () => {
  const [infoAsset, setInfoAsset] = React.useState();
  const [infoOperations, setInfoOperations] = React.useState();

  const { Search } = Input;
  const onSearch = (value) => {
    const server = new StellarSdk.Server(
      "https://stellar-main.bdnodes.net?auth=FUIlmIFMBoB597ZnYqVct1c7kRBKswMVPCyTu7DP5NU"
    );
    server
      .accounts()
      .forSigner(value)
      .call()
      .then(resp => resp.records[0].balances)
      .then(resp => setInfoAsset(resp))
      .catch(err => console.error(err));
    server
      .operations()
      .forAccount(value)
      .order('desc')
      .join('transactions')
      .call()
      .then(resp => {
        console.log(resp.records)
        setInfoOperations(resp.records)})
      .catch(err => console.error(err));
  };
  return (
    <>
      {/* <Connect /> */}
      <Space
        direction="vertical"
        align="center"
        size="large"
        style={{ display: "block" }}
      >
        <Search
          placeholder="Your Stellar Address"
          allowClear
          enterButton="Start"
          size="large"
          onSearch={onSearch}
          className={styleInput.input}
        />
      </Space>
      {infoAsset && infoOperations &&(
        <>
        <Divider orientation="left">Assets</Divider>
        <Row gutter={[16, 16]}>
          {infoAsset.map((item, index) => (
            <Col flex="auto" key={index}>
              <div>
              <h6>{item.asset_type === 'native' ? 'XLM' : item.asset_code}</h6> 
              {item.balance}
              </div>
            </Col>
          ))}
          </Row>
        <Divider orientation="left">Last operations</Divider>
        <List
          size="large"
          bordered
          dataSource={infoOperations}
          renderItem={item => 
          <List.Item>
          <div>
          <span>{item.type}</span>
          </div>
          <span>{item.amount}</span>
          <span>{item.transaction_attr.created_at}</span>
          </List.Item>
          }
        />
        </>
      )}
    </>
  );
};

export default InputWallet;
