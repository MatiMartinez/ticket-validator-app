import { useParams, useNavigate } from "react-router-dom";
import { Box, Text, Center, IconButton, VStack, Button } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { events } from "../consts/events";
import QRScanner from "../components/QRScanner";
import ManualValidator from "../components/ManualValidator";

export default function TicketValidator() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"selection" | "qr" | "manual">("selection");

  const event = events.find((event) => event.id === eventId);

  // Initialize mode from URL search params
  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "qr") {
      setMode("qr");
    } else if (modeParam === "manual") {
      setMode("manual");
    }
  }, [searchParams]);

  if (!event) {
    return (
      <Center h="100vh" bg="gray.900">
        <VStack>
          <Text color="red.400">Evento no encontrado</Text>
          <Button onClick={() => navigate(`/events`)}>Volver a Eventos</Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box h="100vh" bg="gray.900" position="relative">
      {/* Header con botón cerrar */}
      <Box position="absolute" top={4} left={4} right={4} zIndex={20} display="flex" justifyContent="space-between" alignItems="center">
        <Text color="whiteAlpha.900" fontWeight="bold" fontSize="lg">
          {event.name}
        </Text>
        <IconButton
          aria-label="Cerrar"
          icon={<X size={24} />}
          variant="solid"
          bg="blackAlpha.600"
          color="whiteAlpha.900"
          _hover={{ bg: "blackAlpha.800" }}
          onClick={() => navigate(`/event/${eventId}`)}
        />
      </Box>

      {/* Modo QR Scanner */}
      {mode === "qr" && <QRScanner />}

      {/* Modo Manual */}
      {mode === "manual" && <ManualValidator eventId={event.id} />}
    </Box>
  );
}
