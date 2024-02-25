import React from "react";
import "./App.css";
import { Button, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./i18n/config";
import LocaleSwitcher from "./i18n/LocaleSwitcher";
import { Link } from "react-router-dom";

function App() {
  const { t } = useTranslation();

  return (
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

      <Button as="a" variant="primary">
        {t("greeting")}
      </Button>
      <Button as="a" variant="success">
        {t("greeting2")}
      </Button>
    </Stack>
  );
}

export default App;
