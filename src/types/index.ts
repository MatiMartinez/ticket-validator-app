export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface ValidatedTicket {
  id: string;
  ticketId: string;
  eventId: string;
  validatedAt: string;
  validatedBy: string;
  qrData: string;
  status: "valid" | "invalid" | "already_used";
}
