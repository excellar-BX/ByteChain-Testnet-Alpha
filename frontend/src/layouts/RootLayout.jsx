import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  let [mode, setmode] = useState(<MdLightMode />);

  const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setmode(currentTheme === "light" ? <MdDarkMode /> : <MdLightMode />);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  return (
    <div className="rootlayout">
      <Navbar onclick={toggleDarkMode} modeIcon={mode} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
