import { Button } from "@chakra-ui/react";
import { QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QRValidatorButtonProps {
  eventId: string;
}

export default function QRValidatorButton({ eventId }: QRValidatorButtonProps) {
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
    >
      Validador QR
    </Button>
  );
}
