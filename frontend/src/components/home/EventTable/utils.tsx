import { IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Container } from "@mui/system";

interface ActionHandlers {
  onEditRow: (id: number) => void;
  onDeleteRow: (id: number) => void;
}

export function getColumns({
  onEditRow,
  onDeleteRow,
}: ActionHandlers): GridColDef[] {
  return [
    { field: "title", headerName: "Title", flex: 5 },
    { field: "startDate", headerName: "Start date", flex: 4 },
    { field: "endDate", headerName: "End date", flex: 4 },
    { field: "price", headerName: "Price", flex: 4 },
    { field: "status", headerName: "Status", flex: 4 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <Container
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => onEditRow(Number(params?.id))}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => onDeleteRow(Number(params?.id))}
          >
            <HighlightOffIcon fontSize="inherit" />
          </IconButton>
        </Container>
      ),
    },
  ];
}
