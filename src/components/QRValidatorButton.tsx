import { Button } from "@chakra-ui/react";
import { QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QRValidatorButtonProps {
  eventId: string;
  isDisabled: boolean;
}

export default function QRValidatorButton({ eventId, isDisabled }: QRValidatorButtonProps) {
  const navigate = useNavigate();

  const handleStartQRValidator = () => {
    navigate(`/event/${eventId}/validator?mode=qr`);
  };

  return (
    <Button
      leftIcon={<QrCode size={20} />}
      colorScheme="brand"
      size="lg"
      h={16}
      onClick={handleStartQRValidator}
      isDisabled={isDisabled}
      opacity={isDisabled ? 0.5 : 1}
    >
      {isDisabled ? "Validador QR (No Disponible)" : "Validador QR"}
    </Button>
  );
}
