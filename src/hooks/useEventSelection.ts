import { useNavigate } from "react-router-dom";
import { useEvents } from "./useEvents";

export function useEventSelection() {
  const navigate = useNavigate();
  const { events, isLoading, error } = useEvents();

  const handleEventSelect = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return { events, isLoading, error, handleEventSelect };
}
