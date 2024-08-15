import React from "react";
import "./header.css";
import { MdSearch } from "react-icons/md";
// import { CiWallet } from "react-icons/ci";

const Header = () => {
  // const handleWallet = (e) => {
  //   if (e.target.value === "addwallet") {
  //     const newWallet = document.createElement("option");
  //     newWallet.textContent = prompt("Enter a name for your new wallet: ");
  //     newWallet.value = newWallet.textContent;
  //     if (newWallet.textContent.trim().length !== 0) {
  //       e.target.appendChild(newWallet);
  //       const addWalletOption = Array.from(e.target.options).find(
  //         (option) => option.value === "addwallet"
  //       );
  //       e.target.appendChild(addWalletOption);
  //       e.target.value = newWallet.value;
  //     } else {
  //       e.target.value = e.target.options[0].value;
  //       alert("Invalid Wallet Name");
  //     }
  //   }
  // };
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
        {/* <div className="balance">
          <span>
            <CiWallet />
            <select name="wallet" id="wallet" onChange={handleWallet}>
              <option value="Main Wallet">Main Wallet</option>
              <option value="addwallet">+ New Wallet</option>
            </select>
          </span>
          <div>
            <p>BALANCE: </p>
            <h2>$0.00</h2>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
