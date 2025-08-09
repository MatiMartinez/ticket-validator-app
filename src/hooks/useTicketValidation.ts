import { useParams } from "react-router-dom";
import { useTicketStore } from "../store/ticketStore";
import { ValidatedTicket } from "../types";
import { ticketService, ValidateEntryOutput } from "../services/tickets";

export function useTicketValidation() {
  const { eventId } = useParams<{ eventId: string }>();
  const { addValidatedTicket } = useTicketStore();

  const validateTicket = async (
    qrData: string
  ): Promise<{ status: string; ticketNumber?: string; message: string; apiResponse: ValidateEntryOutput }> => {
    try {
      // Llamada real a la API
      const apiResponse = await ticketService.validateEntry(qrData);

      // Mapear el resultado del API a nuestro formato de estado
      let status: "valid" | "invalid";
      if (apiResponse.result === 1) {
        status = "valid";
      } else {
        status = "invalid";
      }

      // Crear el ticket validado
      const validatedTicket: ValidatedTicket = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ticketId: apiResponse.data?.ticketNumber || qrData.substring(0, 20),
        eventId: eventId!,
        validatedAt: new Date().toISOString(),
        validatedBy: "system",
        status,
      };

      // Agregar al store
      addValidatedTicket(validatedTicket);

      return {
        status,
        ticketNumber: apiResponse.data?.ticketNumber,
        message: apiResponse.message,
        apiResponse,
      };
    } catch (error) {
      console.error("Error validating ticket:", error);

      return {
        status: "invalid",
        message: "Error de conexión",
        apiResponse: { result: 0, message: "Error de conexión" },
      };
    }
  };

  return { validateTicket };
}
