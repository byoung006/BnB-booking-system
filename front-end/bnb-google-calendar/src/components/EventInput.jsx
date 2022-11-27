import { TextField } from "@mui/material";

const EventInput = ({
  placeholder,
  label,
  name,
  type = "text",
  onChange,
  events,
  eventDataErrors,
  phrase,
  textArea = false,
}) => {
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
        <textarea
          form={events}
          {...{ value: events[name] }}
          onChange={onChange}
          style={{ color: "red" }}
          key={phrase.id}
          name={name}
        />
      </label>
    </>
  );
};
export default EventInput;
