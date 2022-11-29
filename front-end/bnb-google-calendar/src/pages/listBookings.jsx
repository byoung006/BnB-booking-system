import { Typography } from "@mui/material";
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
  return savedEvents ? (
    <div className={"box"}>
      <Typography variant={"h4"}>Upcoming Bookings</Typography>
      <Container>
        <BookedDates bookedDates={savedEvents} />
      </Container>
    </div>
  ) : (
    <>There are no upcoming bookings</>
  );
};
export default ListBookings;
