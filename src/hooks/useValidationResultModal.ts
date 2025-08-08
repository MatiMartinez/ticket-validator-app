import { useEffect } from "react";

interface UseValidationResultModalProps {
  status: string | null;
  isValidating: boolean;
  onClose: () => void;
}

export function useValidationResultModal({ status, isValidating, onClose }: UseValidationResultModalProps) {
  // Auto-close modal after 5 seconds if validation is successful
  useEffect(() => {
    if (status === "valid" && !isValidating) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, isValidating, onClose]);

  const shouldShowModal = status !== null;
  const shouldShowLoading = isValidating;

  return { shouldShowModal, shouldShowLoading };
}
