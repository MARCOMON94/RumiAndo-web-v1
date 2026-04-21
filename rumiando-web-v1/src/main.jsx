import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AnimalsProvider } from "./context/AnimalsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimalsProvider>
      <App />
    </AnimalsProvider>
  </React.StrictMode>
);