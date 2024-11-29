import React from "react";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <h1>InstaClone</h1>
        <img
          src="https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg"
          alt="instagram Logo"
        />
      </header>
      <Home />
    </div>
  );
}

export default App;
