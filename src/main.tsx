import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Hide initial loading when React is ready
const hideInitialLoading = () => {
  const loadingElement = document.getElementById("initial-loading");
  if (loadingElement) {
    loadingElement.style.opacity = "0";
    loadingElement.style.transition = "opacity 0.3s ease-out";
    setTimeout(() => {
      loadingElement.remove();
    }, 300);
  }
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Hide loading immediately after React renders
hideInitialLoading();
