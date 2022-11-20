import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Grid } from "@mui/material";
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
        <span key={phrase.id}>{label}</span>{" "}
        {eventDataErrors?.[name]?.map((error) => (
          <span key={error.id} style={{ color: "red", fontWeight: "bold" }}>
            {error}
          </span>
        ))}
        <br />
        <input
          className={"box"}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          key={phrase.id}
          {...(type !== "file" ? { value: events[name] } : {})}
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
          key={phrase.id}
          name={name}
        />
      </label>
    </>
  );
};

const BookedDates = ({ bookedDates }) => {
  console.log(bookedDates, "bookedDates");
  return (
    <Grid container spacing={3}>
      {bookedDates.map((bookedDate) => {
        return (
          <Grid item xs={6}>
            <p>{bookedDate.description}</p>
            <p>{bookedDate.summary}</p>
            <p>{bookedDate.start.date}</p>
            <p>{bookedDate.end.date}</p>
            <p>{bookedDate.attendees}</p>
          </Grid>
        );
      })}
    </Grid>
  );
};
function App() {
  const [events, setEvents] = useState({});
  const [savedEvents, setSavedEvents] = useState([]);
  console.log(savedEvents, "saved events");
  const [eventDataErrors, setEventDataErrors] = useState({});
  const handleInputChange = (e) => {
    setEvents({ ...events, [e.target.name]: e.target.value });
  };
  function getBackendApi() {
    let host = window.location.host;
    if (host === "localhost:5173") {
      return "http://localhost:3000";
    }
  }
  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get(`${getBackendApi()}/`);
      console.log(data, "data");
      setSavedEvents(data.events);
    };
    init();
  }, []);

  const handleAddEvent = (e) => {
    console.log(e, "e.target.value");
    e.preventDefault();
    let headers = { "Content-Type": "application/json" };

    let stringifiedEvents = JSON.stringify(events);
    console.log(stringifiedEvents, "stringifiedEvents");
    let formDataUrl = `${getBackendApi()}/createEvent`;

    axios
      .post(formDataUrl, stringifiedEvents, { headers: headers })
      .then(function (response) {
        console.log(response, "response");
        if (response.status === 200) {
          console.log(response.status, "success");
        } else {
          console.log(response, "error?");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="App">
      <BookedDates bookedDates={savedEvents} />
      <EventInput
        events={events}
        eventDataErrors={eventDataErrors}
        onChange={handleInputChange}
        placeholder={"Summary"}
        name={"summary"}
        phrase={"summary"}
        label={
          "Which type of Booking is this? (e.g. 'Multi-night stay', 'Single-night stay')"
        }
      />
      <br />
      <EventInput
        events={events}
        eventDataErrors={eventDataErrors}
        onChange={handleInputChange}
        placeholder={"startDate"}
        name={"startDate"}
        phrase={"startDate"}
        label={"startDate"}
        type={"date"}
      />
      <br />
      <EventInput
        events={events}
        eventDataErrors={eventDataErrors}
        onChange={handleInputChange}
        placeholder={"endDate"}
        name={"endDate"}
        phrase={"endDate"}
        label={"endDate"}
        type={"date"}
      />
      <br />
      <EventInput
        events={events}
        eventDataErrors={eventDataErrors}
        onChange={handleInputChange}
        placeholder={"Number of Guests"}
        name={"attendees"}
        phrase={"attendees"}
        label={"Number of Guests"}
      />
      <button onClick={handleAddEvent}>Add Event</button>
      <br />
    </div>
  );
}

export default App;
