import { Button } from "@chakra-ui/react";
import { Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ManualValidatorButtonProps {
  eventId: string;
}

export default function ManualValidatorButton({ eventId }: ManualValidatorButtonProps) {
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
    >
      Validador Manual
    </Button>
  );
}
