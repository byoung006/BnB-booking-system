import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import BookedDates from "../components/BookedDates.jsx";
import EventInput from "../components/EventInput.jsx";
import getBackendApi from "../helper-functions/getBackendApi.jsx";
import axios from "axios";
import { styled } from "@mui/system";
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
const CreateBooking = () => {
  const [events, setEvents] = useState({});
  const [eventDataErrors, setEventDataErrors] = useState({});

  const handleInputChange = (e) => {
    setEvents({ ...events, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    let headers = { "Content-Type": "application/json" };

    let stringifiedEvents = JSON.stringify(events);
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
      <StyledButton onClick={handleAddEvent}>Add Event</StyledButton>
      <br />
    </div>
  );
};
export default CreateBooking;
