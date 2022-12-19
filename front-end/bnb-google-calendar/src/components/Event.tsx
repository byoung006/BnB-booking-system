import React, { useEffect, useState } from "react";
import axios from "axios";
import getBackendApi from "../helper-functions/getBackendApi.jsx";
import { TextField } from "@mui/material";
import { SingleEvent } from "../interfaces/PromiseInterfaces";
const Event: React.FC<SingleEvent> = ({ eventId }:SingleEvent) => {
  const [event, setEvent] = useState([]);
  console.log(event, "event summary")
  const usefulDetails = ["summary", "description", "start", "end", "htmlLink"];
  async function getSingleEvent() {
    const { data } = await axios.get(
      `${getBackendApi()}/event?eventId=${eventId}`
    );
    setEvent(data.event);
  };
  useEffect(() => {
    getSingleEvent();
  }, []);

  return (
    <>
      <div style={{ padding: "5% 0 5% 0" }}>
        {usefulDetails.map((e)=>{ if (typeof e === 'object')
        {return Object.entries(e)} 
          return (
            <>{e}</>
          )} 
        )}
      </div>
      <br />
    </>
  );
};
export default Event;
