import { useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { ticketService } from "../services/tickets";
import { useTicketStore } from "../store/ticketStore";
import { ValidatedTicket, Event } from "../types";

export function useManualValidation(event: Event) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addValidatedTicket } = useTicketStore();

  const [manualInput, setManualInput] = useState<string>("");
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateManualTicket = async () => {
    if (!manualInput.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un código de ticket",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Construir el código completo con el prefijo
    const fullTicketCode = `${event.ticketPrefix}-${manualInput}`;

    setValidationResult(fullTicketCode);
    setIsValidating(true);
    onOpen(); // Abrir modal inmediatamente para mostrar loading

    try {
      // Usar el servicio específico para validación manual con el código completo
      const result = await ticketService.validateManualEntry(fullTicketCode);

      if (result.result === 1) {
        setValidationStatus("valid");
        setValidationMessage(result.message);

        // Agregar al store de tickets validados
        const validatedTicket: ValidatedTicket = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ticketId: fullTicketCode,
          eventId: event.id,
          validatedAt: new Date().toISOString(),
          validatedBy: "manual-validator",
          status: "valid",
        };

        addValidatedTicket(validatedTicket);
      } else {
        setValidationStatus("invalid");
        setValidationMessage(result.message);
      }
    } catch (error) {
      console.error("Error durante la validación manual:", error);
      setValidationStatus("invalid");
      setValidationMessage("Error al validar el ticket. Intenta nuevamente.");
    } finally {
      setIsValidating(false);
      setManualInput(""); // Limpiar input después de validar
    }
  };

  const handleClose = () => {
    onClose();
    setValidationResult(null);
    setValidationStatus(null);
    setValidationMessage(null);
    setIsValidating(false);
    setManualInput("");
  };

  const clearInput = () => {
    setManualInput("");
  };

  return {
    manualInput,
    setManualInput,
    validationResult,
    validationStatus,
    validationMessage,
    isValidating,
    isOpen,
    validateManualTicket,
    handleClose,
    clearInput,
  };
}
