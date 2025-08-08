import { useState, useEffect } from "react";
import { Event } from "../types";
import { events as eventsData } from "../consts/events";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);

        setEvents(eventsData);
        setError(null);
      } catch (err) {
        setError("Error al cargar los eventos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventById = (eventId: string): Event | undefined => {
    return events.find((event) => event.id === eventId);
  };

  return { events, isLoading, error, getEventById };
}
