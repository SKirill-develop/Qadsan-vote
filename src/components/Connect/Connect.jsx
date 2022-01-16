import React from "react";
import { Button } from 'antd';
import albedo from "@albedo-link/intent";

const Connect = () => {
  const [stellarWallet, setStellarWallet] = React.useState("");

  const connectFromAlbedo = () => {
    albedo
      .publicKey()
      .then((res) => setStellarWallet(res.pubkey))
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <Button type="primary" onClick={connectFromAlbedo}>
        Connect from Albedo
      </Button>
      {stellarWallet && <p>Your wallet: {stellarWallet}</p>}
    </div>
  );
};

export default Connect;
