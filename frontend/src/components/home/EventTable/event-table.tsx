"use client";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { getColumns } from "./utils";
import { EventDTO } from "@/constants/types";
import { useEffect, useState } from "react";

interface EventTableProps {
  data: Array<EventDTO>;
  loading?: boolean;
  onEditRow: (id: number) => void;
  onDeleteRow: (id: number) => void;
}

export default function EventTable({
  data,
  loading,
  onEditRow,
  onDeleteRow,
}: EventTableProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Array<EventDTO>>(data);

  const columns = getColumns({ onEditRow, onDeleteRow });
  const paginationModel = { page: 0, pageSize: 10 };
  const pageSizeOptions = [5, 10, 15];

  useEffect(() => {
    const lowercasedSearch = searchText.toLowerCase();
    setFilteredData(
      data.filter(
        (row) =>
          row.title.toLowerCase().includes(lowercasedSearch) ||
          row.status.toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [searchText, data]);

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by title or status"
          fullWidth
        />
      </Box>

      <DataGrid
        rows={filteredData}
        loading={loading}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
      />
    </Paper>
  );
}
