import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Verbs from "./Verbs";
import VerbDetails from "./VerbDetails";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/verbs" element={<Verbs />} />
      <Route path="/verbs/:id/:name?" element={<VerbDetails />} />
    </Routes>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
