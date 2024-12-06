import * as React from "react";
import {
  FormLabel,
  Grid2,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";
import { AlertSeverity, EventDTO } from "@/constants/types";
import { EventStatusEnum } from "@/constants/enums";
import api from "@/services/api";

const FormGrid = styled(Grid2)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface EventFormProps {
  formData: EventDTO;
  setFormData: React.Dispatch<React.SetStateAction<EventDTO>>;
  onSubmit: () => void;
  showAlert: (severity: AlertSeverity, message: string) => void;
}

export default function EventForm({
  formData,
  setFormData,
  onSubmit,
  showAlert,
}: EventFormProps) {
  const isUpdating: boolean = !!formData?.id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: EventDTO) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData: EventDTO) => ({
      ...prevData,
      status: e.target.value as EventStatusEnum,
    }));
  };

  const handleDateChange =
    (name: "startDate" | "endDate") => (date: string) => {
      setFormData((prevData: EventDTO) => ({
        ...prevData,
        [name]: new Date(date),
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const promise = isUpdating
      ? api.updateEvent(formData.id!, formData)
      : api.createEvent(formData);

    promise
      .then(() => {
        showAlert("success", "Saved event data successfully.");
      })
      .catch((e) => {
        const errorMessage = e.data || "Failed to save event data.";
        console.error("ERROR: ", errorMessage);
        showAlert("error", errorMessage);
      })
      .finally(() => onSubmit());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={3}>
        <FormGrid size={{ xs: 12 }} style={{ display: "none" }}>
          <input type="hidden" name="id" value={formData.id ?? ""} />
        </FormGrid>

        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="title" required>
            Title
          </FormLabel>
          <OutlinedInput
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Event Title"
            required
            size="small"
          />
        </FormGrid>

        <Grid2 container spacing={3} size={{ xs: 12 }}>
          <Grid2 size={{ xs: 6 }}>
            <FormLabel htmlFor="startDate" required>
              Start Date
            </FormLabel>
            <TextField
              id="startDate"
              name="startDate"
              type="datetime-local"
              value={formData.startDate.toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange("startDate")(e.target.value)}
              required
              size="small"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <FormLabel htmlFor="endDate" required>
              End Date
            </FormLabel>
            <TextField
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={formData.endDate.toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange("endDate")(e.target.value)}
              required
              size="small"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={3} size={{ xs: 12 }}>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="price" required>
              Price
            </FormLabel>
            <OutlinedInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
              size="small"
            />
          </FormGrid>

          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="status" required>
              Status
            </FormLabel>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              fullWidth
              required
              size="small"
            >
              {Object.values(EventStatusEnum).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormGrid>
        </Grid2>

        <FormGrid size={{ xs: 12 }} sx={{ alignItems: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "50%" }}
          >
            Submit
          </Button>
        </FormGrid>
      </Grid2>
    </form>
  );
}
