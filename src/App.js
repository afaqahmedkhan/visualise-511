import React from "react";
import {
  getLines,
  getOperators,
  getPatterns,
  getStops,
  getTimeTable,
} from "./APIs/api";
import "./App.css";
import logo from "./logo.svg";

function App() {
  getOperators("AC");
  getPatterns("AC", "19");
  getTimeTable("AC", "19");
  getLines("SF");
  getStops("SF");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
