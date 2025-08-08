import httpInstance from "./httpInstance";

const TICKETS_ENDPOINT = "/tickets";

export const ticketService = {
  async validateEntry(input: string) {
    const response = await httpInstance.post<ValidateEntryOutput>(`${TICKETS_ENDPOINT}/validate-entry`, { token: input });
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
