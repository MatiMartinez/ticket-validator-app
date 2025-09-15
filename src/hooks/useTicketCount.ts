import { useState, useEffect } from "react";
import { ticketService } from "../services/tickets";
import { TicketCount } from "../models/ticketCount";

export function useTicketCount(eventId: string) {
  const [ticketCount, setTicketCount] = useState<TicketCount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTicketCount = async () => {
    if (!eventId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await ticketService.GetTicketCountByEventId(eventId);

      if (result.result === 1 && result.data) {
        setTicketCount(result.data);
      } else {
        setError(result.message || "Error al obtener el conteo de tickets");
      }
    } catch (err) {
      console.error("Error fetching ticket count:", err);
      setError("Error al cargar el conteo de tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketCount();
  }, [eventId]);

  return {
    ticketCount,
    isLoading,
    error,
    refetch: fetchTicketCount,
  };
}
