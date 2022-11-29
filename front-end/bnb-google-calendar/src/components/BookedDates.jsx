import { Grid, TextField } from "@mui/material";
import { handleDateFormat } from "../helper-functions/handleDateFormat.jsx";
import Divider from "@mui/material/Divider";
const BookedDates = ({ bookedDates }) => {
  console.log("bookedDates", bookedDates);
  return bookedDates.map((date) => {
    console.log(date, "date");
    return (
      <>
        <Grid
          key={date.id}
          container
          direction={"column"}
          justifyContent={"center"}
          style={{ paddingTop: "5%" }}
        >
          <Grid item xs={6}>
            <TextField
              helperText={"Description"}
              inputProps={{ readOnly: true }}
              value={date.description}
              multiline
            />
            <TextField
              helperText={"Title"}
              inputProps={{ readOnly: true }}
              value={date.summary}
              multiline
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              helperText={"Start Date"}
              inputProps={{ readOnly: true }}
              value={handleDateFormat(date.start.date)}
            />
            <TextField
              helperText={"End Date"}
              inputProps={{ readOnly: true }}
              value={handleDateFormat(date.end.date)}
            />
          </Grid>
          <div className={"hrefbox"}>
            <a target={"_blank"} href={date.htmlLink}>
              {"Calendar Booking Details"}
            </a>
          </div>
          <Divider style={{ paddingBottom: "5%" }} />
        </Grid>
      </>
    );
  });
};
export default BookedDates;
