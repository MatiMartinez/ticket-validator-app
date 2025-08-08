import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Box,
  Badge,
  Icon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useTicketStatus } from "../hooks/useTicketStatus";
import { useValidationResultModal } from "../hooks/useValidationResultModal";
import { getCurrentValidationDate } from "../utils/date";

interface ValidationResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: string;
  status: string | null;
  ticketNumber?: string | null;
  isValidating: boolean;
}

export default function ValidationResultModal({ isOpen, onClose, result, status, ticketNumber, isValidating }: ValidationResultModalProps) {
  const { getStatusConfig } = useTicketStatus();
  const { shouldShowModal, shouldShowLoading } = useValidationResultModal({
    status,
    isValidating,
    onClose,
  });

  // Show loading state while validating
  if (shouldShowLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="gray.800" borderColor="gray.700" mx={4}>
          <ModalBody py={8}>
            <Center>
              <VStack spacing={4}>
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text color="gray.300" fontSize="lg">
                  Validando ticket...
                </Text>
              </VStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (!shouldShowModal || !status) {
    return null;
  }

  const config = getStatusConfig(status);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="gray.800" borderColor="gray.700" mx={4}>
        <ModalHeader textAlign="center" pb={2}>
          <VStack spacing={3}>
            <Box p={3} borderRadius="full" bg={`${config.color}.900`} border="2px solid" borderColor={`${config.color}.500`}>
              <Icon as={config.icon} w={8} h={8} color={`${config.color}.400`} />
            </Box>
            <Text color="whiteAlpha.900" fontSize="xl" fontWeight="bold">
              {config.title}
            </Text>
          </VStack>
        </ModalHeader>

        <ModalBody py={4}>
          <VStack spacing={4} align="stretch">
            <VStack spacing={3} align="stretch">
              {ticketNumber && (
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Número de Ticket
                  </Text>
                  <Text fontFamily="mono" fontSize="sm" color="whiteAlpha.900" bg="gray.700" p={2} borderRadius="md">
                    {ticketNumber}
                  </Text>
                </Box>
              )}

              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>
                  Estado
                </Text>
                <Badge colorScheme={config.color} variant="solid" display="flex" alignItems="center" gap={1} w="fit-content">
                  <Icon as={config.icon} w={3} h={3} />
                  {config.title}
                </Badge>
              </Box>

              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>
                  Fecha de Validación
                </Text>
                <Text fontSize="sm" color="gray.300">
                  {getCurrentValidationDate()}
                </Text>
              </Box>

              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>
                  Validado por
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Validador App
                </Text>
              </Box>

              {result && (
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Datos del QR
                  </Text>
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    color="gray.400"
                    bg="gray.700"
                    p={2}
                    borderRadius="md"
                    wordBreak="break-all"
                    maxH="60px"
                    overflowY="auto"
                  >
                    {result}
                  </Text>
                </Box>
              )}
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter pt={2}>
          <Button colorScheme="brand" w="full" onClick={onClose}>
            Continuar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
