import React from "react";
import "./header.css";
import { MdSearch } from "react-icons/md";
import { CiWallet } from "react-icons/ci";

const Header = () => {
  return (
    <div>
      <div className="headercontainer">
        <div className="searchcont">
          <h1>Embark with Bytechain Explorer</h1>
          <div className="searchbox">
            <select name="filter" id="filter">
              <option value="all">All Filters</option>
              <option value="address">Address</option>
              <option value="token">Token</option>
              <option value="block">Block</option>
              <option value="transaction-hash">Transaction Hash</option>
            </select>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Address, Tokens, Blocks and Transaction Hash"
            />
            <button>
              <MdSearch style={{ fontSize: "1.7rem" }} />
            </button>
          </div>
        </div>
        <div className="balance">
          <h3>
            <CiWallet />
            Wallet 1
          </h3>
          <div>
            <p>BALANCE: </p>
            <h2>$0.00</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
