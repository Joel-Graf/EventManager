"use client";

import { Button, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EventTable from "@/components/home/EventTable/event-table";
import EventModal from "@/components/home/EventModal/event-modal";
import { AlertSeverity, AlertState, EventDTO } from "@/constants/types";
import api from "@/services/api";
import { GridAddIcon } from "@mui/x-data-grid";
import { EventStatusEnum } from "@/constants/enums";
import AlertComponent from "@/components/global/alert-component";

const eventInitialState: EventDTO = {
  id: undefined,
  title: "",
  startDate: new Date(),
  endDate: new Date(new Date().getTime() + 60 * 60 * 1000),
  price: 0,
  status: EventStatusEnum.Started,
};

const initialAlertState: AlertState = {
  open: false,
  severity: "success",
  message: "",
};

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<EventDTO>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<EventDTO>(eventInitialState);
  const [alertState, setAlertState] = useState<AlertState>(initialAlertState);

  const showAlert = (severity: AlertSeverity, message: string) => {
    setAlertState({ open: true, severity, message });
  };

  const handleOpenModal = (eventDTO?: EventDTO) => {
    setFormData(eventDTO ?? eventInitialState);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setFormData(eventInitialState);
    setOpenModal(false);
    refreshData();
  };

  const onEditRow = (id: number) => {
    const dataToEdit = data.find((obj) => obj.id === id);
    if (dataToEdit) {
      handleOpenModal(dataToEdit);
    } else {
      showAlert("error", "Event not found.");
    }
  };

  const onDeleteRow = (id: number) => {
    api
      .deleteEvent(id)
      .then(() => {
        showAlert("success", "Deleted event successfully.");
        refreshData();
      })
      .catch((error) => {
        console.error("Error deleting event: ", error);
        showAlert("error", "Failed to delete event.");
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {
    setLoading(true);

    getEvents()
      .then((data) => {
        setData(data ?? []);
      })
      .catch((e) => {
        console.error("Error fetching events: ", e);
        showAlert("error", "Failed to fetch event data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getEvents() {
    try {
      const events = await api.getAllEvents();
      return events;
    } catch (e) {
      console.error("Error fetching events: ", e);
      showAlert("error", "Failed to fetch event data.");
      return [];
    }
  }

  return (
    <Container sx={{ paddingTop: 3 }} maxWidth="xl">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1.25rem",
        }}
        elevation={3}
      >
        <Container
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Event list</Typography>
          <Button
            variant="contained"
            endIcon={<GridAddIcon />}
            onClick={() => handleOpenModal()}
          >
            Add Event
          </Button>
          <EventModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            formData={formData}
            setFormData={setFormData}
            showAlert={showAlert}
          />
        </Container>

        <EventTable
          data={data}
          loading={loading}
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
        />
      </Paper>

      <AlertComponent alertState={alertState} setAlertState={setAlertState} />
    </Container>
  );
}
