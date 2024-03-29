import React from "react";
import "./App.css";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./i18n/config";
import LocaleSwitcher from "./i18n/LocaleSwitcher";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Verbs from "./Pages/Verbs";
import VerbDetails from "./Pages/VerbDetails";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

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
    <Provider store={store}>
      <BrowserRouter>

        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">{t("Phrasal Flow")}</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">{t("Home")}</Nav.Link>
              <Nav.Link href="/verbs">{t("List")}</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <LocaleSwitcher />
            </Nav>
          </Container>
        </Navbar>

        <Routing />
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
