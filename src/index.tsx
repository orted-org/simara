import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ToastManager from "./Components/ToastManager";
import { SimaraThemeContext } from "./Global/Context";
import { SimaraDarkTheme } from "./Global/ThemeData";

ReactDOM.render(
  <React.StrictMode>
    <SimaraThemeContext.Provider
      value={{
        themeData: {
          ...SimaraDarkTheme,
          BorderRadius: 5,
          SmallHeight: 34,
          MediumHeight: 36,
          LargeHeight: 38,
        },
      }}
    >
      <ToastManager>
        <App />
      </ToastManager>
    </SimaraThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
