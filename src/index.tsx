import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";

import "bootstrap/dist/css/bootstrap.css";

import { App } from "./App";
import { i18n } from "./i18n";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);
