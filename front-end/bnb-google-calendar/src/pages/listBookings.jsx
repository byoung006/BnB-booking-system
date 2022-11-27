import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import BookedDates from "../components/BookedDates.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import getBackendApi from "../helper-functions/getBackendApi.jsx";
import { Container } from "@mui/material";

const ListBookings = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [isBooked, setIsBooked] = useState(false);

  const init = async () => {
    const { data } = await axios.get(`${getBackendApi()}/`);
    console.log(data, "data");
    setSavedEvents(data.events);
    setIsBooked(true);
  };

  useEffect(() => {
    init();
  }, [isBooked]);
  return (
    <div className={"box"}>
      <Container>
        <BookedDates bookedDates={savedEvents} />
      </Container>
    </div>
  );
};
export default ListBookings;
