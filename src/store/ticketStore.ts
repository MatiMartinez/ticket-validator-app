import { create } from "zustand";
import { ValidatedTicket } from "../types";

interface TicketStore {
  validatedTickets: ValidatedTicket[];
  addValidatedTicket: (ticket: ValidatedTicket) => void;
  getTicketsByEventId: (eventId: string) => ValidatedTicket[];
  clearTickets: () => void;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  validatedTickets: [],

  addValidatedTicket: (ticket: ValidatedTicket) => {
    set((state) => ({
      validatedTickets: [ticket, ...state.validatedTickets],
    }));
  },

  getTicketsByEventId: (eventId: string) => {
    const { validatedTickets } = get();
    return validatedTickets.filter((ticket) => ticket.eventId === eventId);
  },

  clearTickets: () => {
    set({ validatedTickets: [] });
  },
}));
