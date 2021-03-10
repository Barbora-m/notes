import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  cz: {
    translation: {
      notes: "Poznámky",
      addNote: "Přidat poznámku",
      addNoteInputPlaceholder: "Napište prosím poznámku zde...",
      noteError: "Poznámka nebyla přidána, zkuste to prosím znovu.",
      back: "Zpět",
      noteDetailTitle: "Poznámka",
      save: "Uložit",
      delete: "Smazat",
      cancel: "Zrušit",
    },
  },
  en: {
    translation: {
      notes: "Notes",
      addNote: "Add note",
      addNoteInputPlaceholder: "Please enter your note here...",
      noteError: "Your note was not added, please try again.",
      back: "Back",
      noteDetailTitle: "Note",
      save: "Save",
      delete: "Delete",
      cancel: "Cancel",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
