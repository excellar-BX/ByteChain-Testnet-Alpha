import React from "react";
import { CiWallet } from "react-icons/ci";

const Wallet = () => {
  const handleWallet = (e) => {
    if (e.target.value === "addwallet") {
      const newWallet = document.createElement("option");
      newWallet.textContent = prompt("Enter a name for your new wallet: ");
      newWallet.value = newWallet.textContent;
      if (newWallet.textContent.trim().length !== 0) {
        e.target.appendChild(newWallet);
        const addWalletOption = Array.from(e.target.options).find(
          (option) => option.value === "addwallet"
        );
        e.target.appendChild(addWalletOption);
        e.target.value = newWallet.value;
      } else {
        e.target.value = e.target.options[0].value;
        alert("Invalid Wallet Name");
      }
    }
  };
  return (
    <div className="wallet">
      <div className="balance">
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
      </div>
    </div>
  );
};

export default Wallet;
