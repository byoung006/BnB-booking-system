const express = require("express");
const { google } = require("googleapis");
const { urlencoded } = require("express");
const cors = require("cors");
const logger = require("morgan");

require("dotenv").config({ path: "./.env" });
//hello there this is a test to open nvim for writting commits 
const app = express();
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});
app.get("/event", (req, res) => {
  console.log(res, "res");
  const EVENT_ID = req.query.eventId;
  console.log(EVENT_ID, "EVENT_ID");

  calendar.events.get(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      maxResults: 1,
      singleEvents: true,
      eventId: EVENT_ID,
    },
    (error, result) => {
      console.log(result, "result from google");
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data) {
          res.send(JSON.stringify({ event: result.data }));
        } else {
          res.send(
            JSON.stringify({
              message:
                "No event with that ID found - maybe this event has already happened?",
            })
          );
        }
      }
    }
  );
});
app.get("/", (req, res) => {
  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
});
app.post("/createEvent", cors(), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let newEvent = {
    summary: req.body.summary,
    location: "Pigeon Lake, AB, Canada",
    description: req.body.description,
    start: {
      date: req.body.startDate,
      timeZone: "UTC-7",
    },
    end: {
      date: req.body.endDate,
      timeZone: "UTC-7",
    },
    attendees: req.body.attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  console.log(newEvent, "newEvent");
  const auth = new google.auth.GoogleAuth({
    keyFile: "./bnb-calendar-access-a2a8476289eb.json",
    scopes: "https://www.googleapis.com/auth/calendar",
  });
  auth.getClient().then((a) => {
    calendar.events.insert(
      {
        auth: a,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: newEvent,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err.errors
          );
          console.log(err.errors);
          return;
        }
        console.log("Event created: %s", event.data);
        res.jsonp(`Event successfully created! /n ${event.data}`);
      }
    );
  });
});

app.listen(3000, () => console.log(`App listening on port 3000!`));
