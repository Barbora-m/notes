import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { i18n } from "./i18n";

export const renderWithProviders = (component: ReactElement) =>
  renderer.create(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>{component}</MemoryRouter>
    </I18nextProvider>
  );
