import React from "react";
import "./App.css";
import { Button, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./i18n/config";
import LocaleSwitcher from "./i18n/LocaleSwitcher";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Verbs from "./Verbs";
import VerbDetails from "./VerbDetails";
import Home from "./Home";

function App() {
  const { t } = useTranslation();

  const Routing = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verbs" element={<Verbs />} />
        <Route path="/verbs/:id/:name?" element={<VerbDetails />} />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <Stack direction="horizontal" gap={2}>
        <LocaleSwitcher />

        <ul>
          <li>
            <Link to="/">main</Link>
          </li>
          <li>
            <Link to="/verbs/1">verb details</Link>
          </li>
          <li>
            <Link to="/verbs">list</Link>
          </li>
        </ul>

        <Routing />

        <Button as="a" variant="primary">
          {t("greeting")}
        </Button>
        <Button as="a" variant="success">
          {t("greeting2")}
        </Button>
      </Stack>
    </BrowserRouter>
  );
}

export default App;
