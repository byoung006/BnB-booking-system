import { TextFieldProps } from "@mui/material/TextField/TextField";

export type EventNames =
  | "summary"
  | "startDate"
  | "endDate"
  | "attendees"
  | "description";

export type EventInputProps = {
  eventDataErrors: { [Property in keyof EventNames]: string };
  phrase: {
    id: string;
  };
  events: {
    id: string;
  };
  name: EventNames;
  textFieldProps: TextFieldProps;
  type: "date" | "textArea" | "text";
  label: string;
};

