import { TicketCount } from "../models/ticketCount";
import httpInstance from "./httpInstance";

export const ticketService = {
  async validateEntry(input: string) {
    const response = await httpInstance.post<ValidateEntryOutput>(`/validate-entry`, { token: input });
    return response.data;
  },
  async validateManualEntry(input: string) {
    const response = await httpInstance.post<ValidateManualEntryOutput>(`/validate-manual-entry`, { ticketNumber: input });
    return response.data;
  },
  async GetTicketCountByEventId(input: string) {
    const response = await httpInstance.get<GetTicketCountByEventIdOutput>(`/ticket-count/${input}`);
    return response.data;
  },
};

export interface ValidateEntryOutput {
  result: number;
  message: string;
  data?: {
    ticketNumber: string;
  };
}

export interface ValidateManualEntryOutput {
  result: number;
  message: string;
  data?: {
    ticketNumber: string;
  };
}

export interface GetTicketCountByEventIdOutput {
  result: number;
  message: string;
  data?: TicketCount;
}
