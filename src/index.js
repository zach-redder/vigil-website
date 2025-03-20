// This work is based on "DUMBELL"
// (https://sketchfab.com/3d-models/dumbell-92a757b4a0ff421a9b9be236315d392b)
// by Chandu merovix (https://sketchfab.com/Shadowtiger)
// licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
