import React from "react";
import { Input, Space } from "antd";
import StellarSdk from "stellar-sdk";
import styleInput from "./Input-Wallet.module.css"
import { Card } from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const InputWallet = () => {
  const [state, setResState] = React.useState();

  const { Search } = Input;
  const onSearch = (value) => {
    const server = new StellarSdk.Server("https://horizon.stellar.org");
    console.log(value);
    server
      .accounts()
      .forSigner(value)
      .call()
      .then(resp => resp.records[0].balances)
      .then(resp => setResState(resp))
      .catch(function (err) {
        console.error(err);
      });
  };
  return (
    <>
    <Space direction="vertical" align='center' size='large' style={{ display: 'block' }}>
      <Search
        placeholder="Your Stellar Address"
        allowClear
        enterButton="Start"
        size="large"
        onSearch={onSearch}
        className={styleInput.input}
      />
    </Space>
      {state &&
        <Card title="Assets">
        {state.map((item, index) => (
          <Card.Grid style={gridStyle} key={index}>
          <h6>{item.asset_code}</h6>
          {item.balance}
          </Card.Grid>
        ))}
      </Card>
      }
    </>
  );
};

export default InputWallet;
