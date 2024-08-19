import React from "react";
import icon from "../assets/icon.png";
import { NavLink } from "react-router-dom";

const Navbar = ({ onclick, modeIcon }) => {
  return (
    <div>
      <div className="navcontainer">
        <div className="icon">
          <img src={icon} alt="" />
          <p>BYTESCAN</p>
        </div>
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>BlockChain</li>
            <li>
              <NavLink to="wallet">Wallet</NavLink>
            </li>
            <li>NFTs</li>
            <li>Resources</li>
            <li onClick={onclick}>{modeIcon}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
