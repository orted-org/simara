import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ToastManager from "./Components/ToastManager";

ReactDOM.render(
  <React.StrictMode>
    <ToastManager>
      <App />
    </ToastManager>
  </React.StrictMode>,
  document.getElementById("root")
);
