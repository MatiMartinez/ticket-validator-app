import { Button } from "@chakra-ui/react";
import { Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ManualValidatorButtonProps {
  eventId: string;
  isDisabled: boolean;
}

export default function ManualValidatorButton({ eventId, isDisabled }: ManualValidatorButtonProps) {
  const navigate = useNavigate();

  const handleStartManualValidator = () => {
    navigate(`/event/${eventId}/validator?mode=manual`);
  };

  return (
    <Button
      leftIcon={<Edit3 size={20} />}
      variant="outline"
      size="lg"
      h={16}
      onClick={handleStartManualValidator}
      borderColor="whiteAlpha.300"
      color="whiteAlpha.900"
      _hover={{ bg: "whiteAlpha.100" }}
      isDisabled={isDisabled}
      opacity={isDisabled ? 0.5 : 1}
    >
      {isDisabled ? "Validador Manual (No Disponible)" : "Validador Manual"}
    </Button>
  );
}
