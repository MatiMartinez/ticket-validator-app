import { useRef } from "react";

interface UseQRDuplicatePreventionProps {
  preventionTimeMs?: number;
}

export function useQRDuplicatePrevention({ preventionTimeMs = 3000 }: UseQRDuplicatePreventionProps = {}) {
  const lastProcessedQR = useRef<string | null>(null);
  const lastProcessedTime = useRef<number>(0);

  const isDuplicate = (qrData: string, isCurrentlyProcessing: boolean): boolean => {
    const currentTime = Date.now();

    // Verificar si ya está procesando una validación
    if (isCurrentlyProcessing) {
      console.log("Ya se está procesando una validación, ignorando QR:", qrData);
      return true;
    }

    // Verificar si es el mismo QR procesado recientemente
    if (lastProcessedQR.current === qrData && currentTime - lastProcessedTime.current < preventionTimeMs) {
      console.log("QR duplicado ignorado:", qrData);
      return true;
    }

    return false;
  };

  const markAsProcessed = (qrData: string) => {
    lastProcessedQR.current = qrData;
    lastProcessedTime.current = Date.now();
  };

  const clearHistory = () => {
    lastProcessedQR.current = null;
    lastProcessedTime.current = 0;
  };

  return {
    isDuplicate,
    markAsProcessed,
    clearHistory,
  };
}
