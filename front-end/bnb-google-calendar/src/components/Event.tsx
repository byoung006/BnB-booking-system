import React, { useEffect, useState } from "react";
import axios from "axios";
import getBackendApi from "../helper-functions/getBackendApi.jsx";
import { TextField } from "@mui/material";
import { SingleEvent } from "../interfaces/PromiseInterfaces";
type getEvent = () => Promise<SingleEvent>;
const Event: React.FC<SingleEvent> = ({ eventId }) => {
  const [event, setEvent] = useState([]);
  const usefulDetails = ["summary", "description", "start", "end", "htmlLink"];
  const getSingleEvent = async () => {
    const { data } = await axios.get(
      `${getBackendApi()}/event?eventId=${eventId}`
    );
    // console.log(data, "data");
    setEvent(data.event);
  };

  useEffect(() => {
    getSingleEvent();
  }, []);
  return (
    <>
      <div style={{ padding: "5% 0 5% 0" }}>
        {Object.entries(event).map((value, index) => {
          let usefulEventDetails = value.reduce((acc, curr) => {
            console.log(curr, "curr");
            if (usefulDetails.includes(curr)) {
              if (typeof curr[0] === "object") {
                let cats = Object.entries(value[1]);
                console.log(cats, "cats");
                acc.push(cats);
              }
              acc.push(curr);
            }
            console.log(acc, "acc");
            return acc;
          });
          console.log(usefulEventDetails, "usefulEventDetails");
          return <TextField multiline value={value} />;
        })}
      </div>
      <br />
    </>
  );
};
export default Event;
