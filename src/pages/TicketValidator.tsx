import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, VStack, Text, Center, IconButton, Spinner } from "@chakra-ui/react";
import { X } from "lucide-react";

import { useQRScanner } from "../hooks/useQRScanner";
import { events } from "../consts/events";
import ValidationResultModal from "../components/ValidationResultModal";

export default function TicketValidator() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { isLoading, qrResult, validationStatus, ticketNumber, isValidating, isOpen, handleClose, restartCamera } = useQRScanner();

  const event = events.find((event) => event.id === eventId);

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
      {/* Cargando */}
      {isLoading && (
        <Center position="absolute" top={0} left={0} right={0} bottom={0} bg="gray.900">
          <VStack gap={4}>
            <Spinner size="xl" color="brand.500" />
            <Text color="gray.400">Iniciando cámara...</Text>
          </VStack>
        </Center>
      )}

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

      {/* Área de la cámara */}
      <VStack gap={4} w="full" aspectRatio={1} position="absolute" top="15%" left="50%" transform="translateX(-50%)" bg="black">
        <div id="qr-reader" style={{ width: "100%", height: "100%" }}></div>
        <Text color="whiteAlpha.900" fontSize="md" fontWeight="medium" textAlign="center">
          Coloca el código QR dentro del marco
        </Text>
      </VStack>

      {/* Botones abajo en el mismo Box */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        p={6}
        zIndex={20}
      >
        <Button colorScheme="brand" size="lg" w="full" onClick={restartCamera} isLoading={isLoading} loadingText="Reiniciando...">
          Reiniciar cámara
        </Button>
      </Box>

      {/* Modal de resultado */}
      {qrResult && (
        <ValidationResultModal
          isOpen={isOpen}
          onClose={handleClose}
          result={qrResult}
          status={validationStatus}
          ticketNumber={ticketNumber}
          isValidating={isValidating}
        />
      )}
    </Box>
  );
}
