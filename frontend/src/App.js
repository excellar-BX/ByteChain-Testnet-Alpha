import React from "react";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./App.css";
import Navbar from "./components/navbar";
import Header from "./components/header";

function App() {
  let [mode, setmode] = useState(<MdLightMode />);

  const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setmode(currentTheme === "light" ? <MdDarkMode /> : <MdLightMode />);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="App">
      <Navbar onclick={toggleDarkMode} modeIcon={mode} />
      <Header />
    </div>
  );
}

export default App;
