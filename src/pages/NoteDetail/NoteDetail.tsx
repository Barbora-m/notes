import { useCallback, useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  Row,
  Spinner,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { client } from "../../client";
import { useFetch } from "../../hooks";
import { Note } from "../../types";

export const NoteDetail = () => {
  const { push } = useHistory();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [newContent, setNewContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { response: note, isLoading } = useFetch<Note>({
    url: `/${id}`,
    method: "GET",
  });

  const handleContentChange = useCallback((event) => {
    setNewContent(event.target.value);
  }, []);

  const handleSaveClick = useCallback(() => {
    try {
      void client.put(`/${id}`, { content: newContent });

      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [id, newContent]);

  const handleCancelClick = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleContentClick = useCallback(() => {
    setIsEditing(true);
    setNewContent(note?.content || "");
  }, [note]);

  const handleDeleteClick = useCallback(() => {
    try {
      void client.delete(`/${id}`);

      push("/notes");
    } catch (error) {
      console.log(error.message);
    }
  }, [id, push]);

  return (
    <Container>
      <Row>
        <Col>
          <Title>
            {t("noteDetailTitle")} {id}
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          {isEditing ? (
            <InputGroup>
              <ContentInput
                autoFocus
                onChange={handleContentChange}
                value={newContent}
              />
              <SaveButton
                color="success"
                disabled={newContent === note?.content}
                onClick={handleSaveClick}
                size="sm"
              >
                {t("save")}
              </SaveButton>
              <CancelButton onClick={handleCancelClick} size="sm">
                {t("cancel")}
              </CancelButton>
            </InputGroup>
          ) : (
            <ContentWrapper onClick={handleContentClick}>
              {isLoading ? (
                <Spinner size="sm" color="success" />
              ) : (
                note?.content
              )}
            </ContentWrapper>
          )}
        </Col>
      </Row>
      <Row>
        <ButtonsCol>
          <Link to="/notes">
            <Button size="sm">{t("back")}</Button>
          </Link>
          <Button color="danger" onClick={handleDeleteClick} size="sm">
            {t("delete")}
          </Button>
        </ButtonsCol>
      </Row>
    </Container>
  );
};

const Title = styled.h5`
  margin: 15px 0;
`;

const ContentInput = styled(Input)`
  &:focus {
    box-shadow: none;
  }
`;

const SaveButton = styled(Button)`
  border-radius: 0;
`;

const CancelButton = styled(Button)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`;

const ContentWrapper = styled.div`
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  color: #495057;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  height: calc(1.5em + 0.75rem + 2px);
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
`;

const ButtonsCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 10px;
`;
