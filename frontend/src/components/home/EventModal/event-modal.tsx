import * as React from "react";
import Typography from "@mui/material/Typography";
import EventForm from "../EventForm/event-form";
import { Paper, Box } from "@mui/material";
import Modal from "@mui/joy/Modal/Modal";
import { ModalClose, ModalDialog } from "@mui/joy";
import { AlertSeverity, EventDTO } from "@/constants/types";

const paperStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  p: 6,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

interface EventModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  formData: EventDTO;
  setFormData: React.Dispatch<React.SetStateAction<EventDTO>>;
  showAlert: (severity: AlertSeverity, message: string) => void;
}

export default function EventModal({
  openModal,
  handleCloseModal,
  formData,
  setFormData,
  showAlert,
}: EventModalProps) {
  const isUpdating: boolean = !!formData?.id;

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <ModalDialog>
        <Paper elevation={6} sx={paperStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h2">
              {isUpdating ? "Update" : "Add"} Event
            </Typography>
            <ModalClose />
          </Box>

          <EventForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleCloseModal}
            showAlert={showAlert}
          />
        </Paper>
      </ModalDialog>
    </Modal>
  );
}
