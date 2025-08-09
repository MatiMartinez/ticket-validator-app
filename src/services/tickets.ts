import httpInstance from "./httpInstance";

export const ticketService = {
  async validateEntry(input: string) {
    const response = await httpInstance.post<ValidateEntryOutput>(`/validate-entry`, { token: input });
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
