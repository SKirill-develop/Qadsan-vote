import React from "react";
import { Button } from "react-bootstrap";
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
      <Button variant="light" onClick={connectFromAlbedo}>
        Connect from Albedo
      </Button>
      {stellarWallet && <p>Your wallet: {stellarWallet}</p>}
    </div>
  );
};

export default Connect;
