import { useState, useEffect } from 'react';
import { ValidatedTicket } from '../types';

export function useValidatedTickets(eventId: string) {
  const [validatedTickets, setValidatedTickets] = useState<ValidatedTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchValidatedTickets = async () => {
      try {
        setIsLoading(true);
        
        // Simulación de datos - en producción sería una llamada a API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storageKey = `validated_tickets_${eventId}`;
        const savedTickets = localStorage.getItem(storageKey);
        
        if (savedTickets) {
          setValidatedTickets(JSON.parse(savedTickets));
        } else {
          setValidatedTickets([]);
        }
        
        setError(null);
      } catch (err) {
        setError('Error al cargar los tickets validados');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchValidatedTickets();
    }
  }, [eventId]);

  const addValidatedTicket = (ticket: Omit<ValidatedTicket, 'id' | 'validatedAt'>) => {
    const newTicket: ValidatedTicket = {
      ...ticket,
      id: Date.now().toString(),
      validatedAt: new Date().toISOString()
    };

    const updatedTickets = [newTicket, ...validatedTickets];
    setValidatedTickets(updatedTickets);

    // Guardar en localStorage
    const storageKey = `validated_tickets_${eventId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedTickets));
  };

  const getValidatedTicketsCount = () => {
    return validatedTickets.filter(ticket => ticket.status === 'valid').length;
  };

  const getInvalidTicketsCount = () => {
    return validatedTickets.filter(ticket => ticket.status === 'invalid').length;
  };

  const getAlreadyUsedTicketsCount = () => {
    return validatedTickets.filter(ticket => ticket.status === 'already_used').length;
  };

  return {
    validatedTickets,
    isLoading,
    error,
    addValidatedTicket,
    getValidatedTicketsCount,
    getInvalidTicketsCount,
    getAlreadyUsedTicketsCount
  };
}
