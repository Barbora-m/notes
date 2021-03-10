import { renderWithProviders } from "../../../test-utils";
import { AddNote } from "../AddNote";

test("AddNote", () => {
  expect(renderWithProviders(<AddNote />)).toMatchSnapshot();
});
