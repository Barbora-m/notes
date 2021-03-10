import { Container } from "reactstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { AddNote, NoteDetail, Notes } from "./pages";

export const App = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Switch>
          <Route component={AddNote} path="/notes/add" />
          <Route component={NoteDetail} path="/notes/:id" />
          <Route component={Notes} path="/notes" />
        </Switch>
      </BrowserRouter>
    </AppContainer>
  );
};

const AppContainer = styled(Container)`
  background-color: palegoldenrod;
  border-radius: 5px;
  margin-top: 50px;
  max-width: 400px;
`;
