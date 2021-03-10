import { renderWithProviders } from "../../../test-utils";
import { Notes } from "../Notes";

test("Notes", () => {
  expect(renderWithProviders(<Notes />)).toMatchSnapshot();
});
