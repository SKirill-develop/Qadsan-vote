import React from "react";
import { Input, Space } from "antd";
import StellarSdk from "stellar-sdk";
import styleInput from "./Input-Wallet.module.css";
import { Card } from "antd";
import Connect from "../Connect/Connect";
import TableOperation from "../TableOperations/TableOperations";

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
      .call()
      .then(resp => setInfoOperations(resp.records))
      .catch(err => console.error(err));
  };
  return (
    <>
      <Connect />
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
        <Card title="Assets">
          {infoAsset.map((item, index) => (
            <Card.Grid style={gridStyle} key={index}>
              <h6>{item.asset_code}</h6>
              {item.balance}
            </Card.Grid>
          ))}
        </Card>
        <TableOperation data={infoOperations}/>
        </>
      )}
    </>
  );
};

export default InputWallet;
