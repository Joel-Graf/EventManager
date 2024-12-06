import { EventStatusEnum } from "./enums";

export type EventDTO = {
  id?: number;
  title: string;
  startDate: Date;
  endDate: Date;
  price: number;
  status: EventStatusEnum;
};

export type AlertSeverity = "success" | "info" | "warning" | "error";

export interface AlertState {
  open: boolean;
  severity: AlertSeverity;
  message: string;
}
