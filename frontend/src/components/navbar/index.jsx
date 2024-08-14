import React from "react";
import "./navbar.css";
import icon from "../../assets/icon.png";

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
            <li>Home</li>
            <li>Blockchain</li>
            <li>Leaderboard</li>
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
