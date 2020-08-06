import React from "react";
import "./App.css";
import Welcome from "./components/welcome/Welcome";
import Clock from "./components/clock/Clock";

function App() {
  return (
    <div className="App">
      <Welcome />
      <Clock />
    </div>
  );
}

export default App;
