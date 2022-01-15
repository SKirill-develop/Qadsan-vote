import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import Home from "../Home/Home";
import appStyles from "./App.module.css";
import Header from "../Header/Header";

const App = () => (
  <div className={appStyles.App}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="wallet" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;