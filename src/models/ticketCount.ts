export interface TicketCount {
  eventId: string;
  count: Count[];
}

export interface Count {
  type: string;
  count: number;
  used: number;
}
