import React, { useEffect, useState } from "react";
import axios from "axios";
import getBackendApi from "../helper-functions/getBackendApi.jsx";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";

const Event = ({ eventId }) => {
  const [event, setEvent] = useState([]);
  // console.log(event, "event");
  let { id } = useParams();
  // console.log(id, "id");
  const init = async () => {
    const { data } = await axios.get(
      `${getBackendApi()}/event?eventId=${eventId}`
    );
    // console.log(data, "data");
    setEvent(data.event);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div style={{ padding: "5% 0 5% 0" }}>
        {Object.entries(event).map((value, index) => {
          // const eventDetailsList = value.map((event) => event);
          if (typeof value[1] === "object") {
            const eventDetailsList = Object.entries(value).reduce(
              ([curr, acc]) => {
                return acc;
              }
            );
            return value[eventDetailsList];
          }
          return <TextField value={value[0] + ":" + " " + value[1]} />;
        })}
      </div>
      <br />
    </>
  );
};
export default Event;
