import {useState} from "react";
import "./App.css";

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
function App() {
  const [events, setEvents] = useState({});
  const [eventDataErrors, setEventDataErrors] = useState({});
  const handleInputChange = (e) => {
    const { value } = e.target;
    setEvents({ ...events, [e.target.name]: value });
  };

  const handleAddEvent = (e) => {
      e.preventDefault();
      const newFormData = new FormData();


      for (let key in events) {
          newFormData.append(key, events[key]);
      }
      function getBackendApi() {
          let host = window.location.host;
          if(host === "localhost:5173") {
              return "http://localhost:3000";

          }
      }
      console.log(JSON.stringify(newFormData), "newFormData");
      let formDataUrl = `${getBackendApi()}/createEvent`;

           fetch(formDataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFormData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
  }
  return (
    <div className="App">
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
