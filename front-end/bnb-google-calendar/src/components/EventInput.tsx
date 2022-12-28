import { InputProps, TextField } from "@mui/material";
import { ReactNode } from "react";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { EventInputProps } from "../interfaces/InputInterfaces";

const EventInput = ({
  label,
  name,
  type,
  textFieldProps,
  events,
  eventDataErrors,
}: EventInputProps): ReactNode => {
  const multiRow = type !== "date";
  return (
    <>
      <label>
        <span>{label}</span>{" "}
        {eventDataErrors?.[name]?.map((error) => (
          <span key={error.id} style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </span>
        ))}
        <br />
        <TextField
          // form={events}
          style={{
            background: "#fff",
            color: "black",
          }}
          value={events[name]}
          name={name}
          {...(multiRow ? { multiline: true, minRows: 5 } : {})}
          {...textFieldProps}
        />
      </label>
    </>
  );
};
export default EventInput;
