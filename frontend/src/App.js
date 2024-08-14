import React from "react";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./App.css";
import Navbar from "./components/navbar";
import Header from "./components/header";

function App() {
  let [isLightmode, setisLightmode] = useState(true);

  const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setisLightmode(newTheme === "light");
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  let modeIcon = isLightmode ? <MdLightMode /> : <MdDarkMode />;

  return (
    <div className="App">
      <Navbar onclick={toggleDarkMode} modeIcon={modeIcon} />
      <Header />
    </div>
  );
}

export default App;
