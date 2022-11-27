import { Grid } from "@mui/material";
import { handleDateFormat } from "../helper-functions/handleDateFormat.jsx";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/system";
const BookedDates = ({ bookedDates }) => {
  console.log("bookedDates", bookedDates);
  return bookedDates.map((date) => {
    console.log(date, "date");
    return (
      <>
        <Grid key={date.id} container justifyContent={"center"}>
          <Grid item xs={12}>
            <p>{date.description}</p>
            <p>{date.summary}</p>
            <p>{handleDateFormat(date.start.date)}</p>
            <p>{handleDateFormat(date.end.date)}</p>
            <div style={{ textAlign: "center" }}>
              <a target={"_blank"} href={bookedDates.htmlLink}>
                {"Calendar Booking Details"}
              </a>
            </div>
          </Grid>
        </Grid>
        <Divider />
      </>
    );
  });
};
export default BookedDates;
