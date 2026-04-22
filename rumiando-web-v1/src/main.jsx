import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AnimalsProvider } from "./context/AnimalsContext.jsx";
import { WeatherProvider } from "./context/WeatherContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimalsProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </AnimalsProvider>
    </BrowserRouter>
  </React.StrictMode>
);