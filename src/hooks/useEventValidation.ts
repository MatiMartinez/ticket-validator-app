import { useNavigate } from "react-router-dom";
import { useTicketStore } from "../store/ticketStore";

export function useEventValidation(eventId: string) {
  const navigate = useNavigate();
  const { getTicketsByEventId } = useTicketStore();

  const validatedTickets = getTicketsByEventId(eventId);

  const handleStartValidator = () => {
    navigate(`/event/${eventId}/validator`);
  };

  return {
    validatedTickets,
    handleStartValidator,
    isLoading: false,
    error: null,
  };
}
