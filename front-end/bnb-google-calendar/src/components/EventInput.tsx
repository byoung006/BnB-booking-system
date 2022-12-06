import { TextField } from "@mui/material";
import { Input } from "../interfaces/InputInterfaces";
const EventInput: React.FC<Input> = ({
  placeholder,
  label,
  name,
  type = "text",
  onChange,
  events,
  eventDataErrors,
  phrase,
  textArea = false,
}: Input) => {
  return !textArea ? (
    <>
      <label>
        <span key={phrase.id}>{label}</span>
        {eventDataErrors?.[name]?.map((error) => (
          <span key={error.id} style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </span>
        ))}
        <br />
        <TextField
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            background: "#fff",
            color: "black",
          }}
          key={events.id}
          {...{ value: events[name] }}
          name={name}
        />
      </label>
    </>
  ) : (
    <>
      <label>
        <span key={phrase.id}>{label}</span>{" "}
        {eventDataErrors?.[name]?.map((error) => (
          <span key={error.id} style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </span>
        ))}
        <br />
        <TextField
          // form={events}
          {...{ value: events[name] }}
          onChange={onChange}
          key={phrase.id}
          name={name}
          multiline
          minRows={5}
        />
      </label>
    </>
  );
};
export default EventInput;
