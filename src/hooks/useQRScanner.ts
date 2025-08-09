import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useTicketValidation } from "./useTicketValidation";
import { useQRDuplicatePrevention } from "./useQRDuplicatePrevention";

export function useQRScanner() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { validateTicket } = useTicketValidation();
  const { isDuplicate, markAsProcessed, clearHistory } = useQRDuplicatePrevention();

  const [isLoading, setIsLoading] = useState(false);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [manualInput, setManualInput] = useState<string>("");
  const [showManualInput, setShowManualInput] = useState(false);

  const createScanner = () => {
    return new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          return {
            width: Math.min(viewfinderWidth, viewfinderHeight) * 0.8,
            height: Math.min(viewfinderWidth, viewfinderHeight) * 0.8,
          };
        },
        disableFlip: false,
        supportedScanTypes: [0],
      },
      false
    );
  };

  useEffect(() => {
    setIsLoading(true);
    setQrResult(null);

    const html5QrcodeScanner = document.getElementById("qr-reader");

    if (!html5QrcodeScanner) {
      toast({
        title: "Error",
        description: "No se encontró elemento para la cámara",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const newScanner = createScanner();

    setScanner(newScanner);

    newScanner.render(onScanSuccess, onScanFailure);
    setIsLoading(false);

    return () => {
      newScanner
        .clear()
        .then(() => {
          console.log("Scanner limpiado correctamente");
        })
        .catch((err) => {
          console.error("Error al limpiar el escáner:", err);
        });
    };
  }, []);

  const onScanSuccess = async (decodedText: string) => {
    // Verificar duplicados y estado de procesamiento
    if (isDuplicate(decodedText, isValidating)) {
      return;
    }

    console.log("QR escaneado:", decodedText);

    // Marcar como procesado para prevenir duplicados
    markAsProcessed(decodedText);

    setQrResult(decodedText);
    setIsValidating(true);
    onOpen(); // Abrir modal inmediatamente para mostrar loading

    try {
      // Validar el ticket y agregarlo al store
      const result = await validateTicket(decodedText);

      setValidationStatus(result.status);
      setTicketNumber(result.ticketNumber || null);
    } catch (error) {
      console.error("Error durante la validación:", error);
      setValidationStatus("invalid");
      setTicketNumber(null);
    } finally {
      setIsValidating(false);
    }
  };

  const onScanFailure = (error: string) => {
    if (error && !error.includes("No QR code found") && !error.includes("QR code parse error")) {
      console.warn("Error en scanner QR:", error);
    }
  };

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

    console.log("Ticket manual ingresado:", manualInput);

    setQrResult(manualInput);
    setIsValidating(true);
    setShowManualInput(false);
    onOpen(); // Abrir modal inmediatamente para mostrar loading

    try {
      // Validar el ticket y agregarlo al store
      const result = await validateTicket(manualInput);

      setValidationStatus(result.status);
      setTicketNumber(result.ticketNumber || null);
    } catch (error) {
      console.error("Error durante la validación manual:", error);
      setValidationStatus("invalid");
      setTicketNumber(null);
    } finally {
      setIsValidating(false);
      setManualInput(""); // Limpiar input después de validar
    }
  };

  const toggleManualInput = () => {
    setShowManualInput(!showManualInput);
    setManualInput(""); // Limpiar input al abrir/cerrar
  };

  const handleClose = () => {
    onClose();
    setQrResult(null);
    setValidationStatus(null);
    setTicketNumber(null);
    setIsValidating(false);
    setShowManualInput(false);
    setManualInput("");

    // Limpiar historial de duplicados después de cerrar
    setTimeout(() => {
      clearHistory();
    }, 1000);
  };

  const restartCamera = async () => {
    setIsLoading(true);

    // Limpiar scanner actual
    if (scanner) {
      try {
        await scanner.clear();
      } catch (err) {
        console.error("Error al limpiar scanner:", err);
      }
    }

    // Reinicializar
    const html5QrcodeScanner = document.getElementById("qr-reader");
    if (html5QrcodeScanner) {
      const newScanner = createScanner();

      setScanner(newScanner);

      try {
        newScanner.render(onScanSuccess, onScanFailure);
        setIsLoading(false);
        toast({
          title: "Éxito",
          description: "Cámara reiniciada correctamente",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        console.error("Error al reinicializar scanner:", err);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "No se pudo reiniciar la cámara",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return {
    isLoading,
    qrResult,
    validationStatus,
    ticketNumber,
    isValidating,
    isOpen,
    handleClose,
    restartCamera,
    // Manual validation
    manualInput,
    setManualInput,
    showManualInput,
    toggleManualInput,
    validateManualTicket,
  };
}
