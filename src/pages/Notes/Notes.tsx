import { Button, Col, Container, Row, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useFetch } from "../../hooks";
import { Note as NoteType } from "../../types";

export const Notes = () => {
  const { t, i18n } = useTranslation();

  const { response: notes, isLoading } = useFetch<Array<NoteType>>({
    url: "/",
    method: "GET",
  });

  return (
    <Container>
      <Languages>
        <LanguageButton size="sm" onClick={() => i18n.changeLanguage("en")}>
          English
        </LanguageButton>
        <LanguageButton size="sm" onClick={() => i18n.changeLanguage("cz")}>
          Česky
        </LanguageButton>
      </Languages>
      <Row>
        <Header>
          <h4>{t("notes")}</h4>
          <Link to="/notes/add">
            <Button size="sm" color="success">
              {t("addNote")}
            </Button>
          </Link>
        </Header>
      </Row>
      {isLoading && <Loader color="success" />}
      <NotesWrapper>
        {notes?.map(({ id, content }) => {
          return (
            <NoteLink key={id} to={`/notes/${id}`}>
              {content}
            </NoteLink>
          );
        })}
      </NotesWrapper>
    </Container>
  );
};

const Languages = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LanguageButton = styled(Button)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-right: 5px;

  &:focus {
    box-shadow: none;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Header = styled(Col)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: 25px;
`;

const Loader = styled(Spinner)`
  display: block;
  margin: 0 auto;
`;

const NotesWrapper = styled.div`
  padding-bottom: 20px;
`;

const NoteLink = styled(Link)`
  border-bottom: 1px solid darkgray;
  color: black;
  display: block;
  height: auto;
  padding: 10px;

  &:last-child {
    border: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: black;
    text-decoration: none;
    transition: background-color 0.25s;
  }
`;
