import { useCallback, useState } from "react";
import { Alert, Button, CardBody, Col, Input, Row } from "reactstrap";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { client } from "../../client";

export const AddNote = () => {
  const { push } = useHistory();
  const { t } = useTranslation();

  const [noteText, setNoteText] = useState("");
  const [isError, setIsError] = useState(false);

  const handleNoteChange = useCallback((event) => {
    setNoteText(event.target.value);
  }, []);

  const handleBackButtonClick = useCallback(() => {
    push("/notes");
  }, [push]);

  const handleNoteAdd = useCallback(() => {
    try {
      void client.post("/", {
        content: { noteText },
      });

      push("/notes");
      setNoteText("");
    } catch (error) {
      setIsError(true);
    }
  }, [noteText, push]);

  return (
    <CardBody>
      {isError && <Alert color="danger">t{"noteError"}</Alert>}
      <Input
        onChange={handleNoteChange}
        placeholder={t("addNoteInputPlaceholder")}
        value={noteText}
      />

      <Row>
        <ButtonsWrapper>
          <BackButton size="sm" onClick={handleBackButtonClick}>
            {t("back")}
          </BackButton>
          <Button
            color="success"
            disabled={!noteText}
            onClick={handleNoteAdd}
            size="sm"
            type="submit"
          >
            {t("addNote")}
          </Button>
        </ButtonsWrapper>
      </Row>
    </CardBody>
  );
};

const ButtonsWrapper = styled(Col)`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

const BackButton = styled(Button)`
  margin-right: 5px;
`;
