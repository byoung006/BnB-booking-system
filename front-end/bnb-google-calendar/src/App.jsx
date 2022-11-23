import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { color, styled } from "@mui/system";

const StyledButton = styled("button")({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: "1px solid #FF8E53",
  borderRadius: "3px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "black",
  height: "48px",
  padding: "0 30px",
  // add color to the text of the button
  "&:hover": {
    background: "linear-gradient(45deg, #FE6B8B 10%, #FF8E53 50%)",
  },
});

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
        <TextField
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            background: "#fff",
            color: "black",
          }}
          key={phrase.id}
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

const BookedDates = ({ bookedDates }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <p>{bookedDates.description}</p>
        <p>{bookedDates.summary}</p>
        <p>{bookedDates.start.date}</p>
        <p>{bookedDates.end.date}</p>
        <p>{bookedDates.attendees}</p>
      </Grid>
    </Grid>
  );
};

function App() {
  const [events, setEvents] = useState({});
  const [savedEvents, setSavedEvents] = useState([]);
  console.log(savedEvents, "savedEvents");
  const [eventDataErrors, setEventDataErrors] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const [bookedDates, setBookedDates] = useState({});

  const handleInputChange = (e) => {
    setEvents({ ...events, [e.target.name]: e.target.value });
  };

  function getBackendApi() {
    let host = window.location.host;
    if (host === "localhost:5173") {
      return "http://localhost:3000";
    }
  }

  const handleDateFormat = ({ savedEvents }) => {
    //format date to Month Day, Year format
    savedEvents.map((event) => {
      let startAndEndDates = {
        start: new Date(event.start.date).toDateString(),
        end: new Date(event.end.date).toDateString(),
      };
      setBookedDates(startAndEndDates);
      return startAndEndDates;
    });
  };

  const init = async () => {
    const { data } = await axios.get(`${getBackendApi()}/`);
    console.log(data, "data");
    setSavedEvents(data.events);
    handleDateFormat({ savedEvents: data.events });
  };

  useEffect(() => {
    init();
  }, [isBooked]);

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
          setIsBooked(true);
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
      {savedEvents &&
        savedEvents.map((event, idx) => {
          return (
            <Accordion placeholder={"stuff"}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                placeholder={"Booked dates"}
              >
                <h6>{`Booked Dates: ${bookedDates.start} - ${bookedDates.end} `}</h6>
              </AccordionSummary>
              <AccordionDetails
                children={<BookedDates bookedDates={event} />}
              ></AccordionDetails>
            </Accordion>
          );
        })}
      <Grid
        container
        style={{ paddingTop: "10%" }}
        direction="column"
        spacing={3}
      >
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
        <Grid item container direction="row">
          <Grid item xs={6}>
            <EventInput
              events={events}
              eventDataErrors={eventDataErrors}
              onChange={handleInputChange}
              placeholder={"startDate"}
              name={"startDate"}
              phrase={"startDate"}
              label={"Start Date"}
              type={"date"}
            />
          </Grid>
          <br />
          <Grid item xs={6}>
            <EventInput
              events={events}
              eventDataErrors={eventDataErrors}
              onChange={handleInputChange}
              placeholder={"endDate"}
              name={"endDate"}
              phrase={"endDate"}
              label={"End Date"}
              type={"date"}
            />
          </Grid>
        </Grid>
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
      </Grid>
      <br />
      {/*<Button className={"button"} onClick={handleAddEvent}>*/}
      {/*  Add Event*/}
      {/*</Button>*/}
      <StyledButton onClick={handleAddEvent}>Add Event</StyledButton>
      <br />
    </div>
  );
}

export default App;
