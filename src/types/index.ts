export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Event {
  id: string;
  active: number;
  name: string;
  date: string;
  ticketPrefix: string;
}

export interface ValidatedTicket {
  id: string;
  ticketId: string;
  eventId: string;
  validatedAt: string;
  validatedBy: string;
  status: "valid" | "invalid" | "already_used";
}
