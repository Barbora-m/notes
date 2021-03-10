import { renderWithProviders } from "../../../test-utils";
import { NoteDetail } from "../NoteDetail";

test("NoteDetail", () => {
  expect(renderWithProviders(<NoteDetail />)).toMatchSnapshot();
});
