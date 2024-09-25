import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { forwardRef } from "react";

// Set minDateTime to the start of the next hour
const minDateTime = dayjs().add(1, "hour").startOf("hour");

const shouldDisableDate = (date) => {
  // Disable dates before minDateTime
  return date.isBefore(minDateTime, "day");
};

const shouldDisableTime = (time) => {
  // Disable times before minDateTime
  return time.isBefore(minDateTime);
};

const DateExplicitDateTimePicker = forwardRef(
  ({ value, onValueChange }, ref) => {
    const handleChange = (newValue) => {
      // Round the value to the start of the hour (minute 0)
      const adjustedValue = newValue.minute(0).second(0);
      onValueChange(adjustedValue);
    };
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          spacing={2}
          sx={{
            minWidth: 305,
            backgroundColor: "rgb(247, 248, 250)",
            width: 327,
          }}
        >
          <DateTimePicker
            value={value}
            onChange={handleChange}
            referenceDate={dayjs()}
            shouldDisableDate={shouldDisableDate}
            shouldDisableTime={shouldDisableTime}
            views={["year", "month", "day", "hours"]} // Limit view to the hour level
            openTo="hours" // Open picker at the hours view
            ampm={false} // Use 24-hour format if needed
            sx={{
              backgroundColor: "rgb(247, 248, 250)", // Optional: add background color to the DateTimePicker
            }}
          />
          <Typography display={"none"}>
            Stored value: {value == null ? "null" : value.format()}
          </Typography>
        </Stack>
      </LocalizationProvider>
    );
  }
);

export default DateExplicitDateTimePicker;
