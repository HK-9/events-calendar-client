import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from "react-datepicker";
import { addEventSchema } from "./addEventSchema";
import "react-datepicker/dist/react-datepicker.css";
import { IEventData } from "../../../types/forms";
import useGetCalendarEvents from "../../../hooks/use-events-actions.hook";
import { getRoundedDate } from "../helpers";
import { OverlaidSpinner } from "../../Shared";

const now = new Date();
const defaultStartDate = getRoundedDate(
  new Date(now.getTime() + 30 * 60 * 1000)
);
const defaultEndDate = new Date(defaultStartDate.getTime() + 60 * 60 * 1000);

const CreateEvent = () => {
  const { handleCreateEvent, loading } = useGetCalendarEvents();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEventSchema),
    defaultValues: {
      name: "",
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    },
  });

  const onSubmit = async (data: IEventData) => {
    handleCreateEvent(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Event Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Event Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              required
            />
          )}
        />

        {/* Start Date and Time Picker */}
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <Box sx={{ zIndex: 999999 }}>
              <ReactDatePicker
                className="z-50 w-full"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                dateFormat="Pp"
                customInput={
                  <TextField
                    fullWidth
                    label="Start Date & Time"
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                }
              />
            </Box>
          )}
        />

        {/* End Date and Time Picker */}
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <Box sx={{ zIndex: 99999 }}>
              <ReactDatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                dateFormat="Pp"
                customInput={
                  <TextField
                    fullWidth
                    label="End Date & Time"
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                  />
                }
              />
            </Box>
          )}
        />

        {/* Submit Button */}
        <OverlaidSpinner loading={loading}>
          <Button
            disabled={loading}
            className={`${loading && "cursor-not-allowed"}`}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Event
          </Button>
        </OverlaidSpinner>
      </Box>
    </form>
  );
};

export default CreateEvent;
