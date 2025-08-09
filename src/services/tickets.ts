import httpInstance from "./httpInstance";

export const ticketService = {
  async validateEntry(input: string) {
    const response = await httpInstance.post<ValidateEntryOutput>(
      `/validate-entry`,
      { token: input },
      { headers: { "x-api-key": import.meta.env.VITE_SELF_API_KEY } }
    );
    return response.data;
  },
  async validateManualEntry(input: string) {
    const response = await httpInstance.post<ValidateManualEntryOutput>(
      `/validate-manual-entry`,
      { ticketNumber: input },
      { headers: { "x-api-key": import.meta.env.VITE_SELF_API_KEY } }
    );
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
