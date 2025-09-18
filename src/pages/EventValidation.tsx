import { Box, Container, VStack, Text, Card, CardBody, Badge, Divider, Alert, AlertIcon, Spinner, Center, HStack } from "@chakra-ui/react";
import { History, Users, CheckCircle, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { useEventValidation } from "../hooks/useEventValidation";
import { useTicketStatus } from "../hooks/useTicketStatus";
import { useTicketCount } from "../hooks/useTicketCount";
import Header from "../components/Header";
import { formatDate } from "../utils/date";
import QRValidatorButton from "../components/QRValidatorButton";
import ManualValidatorButton from "../components/ManualValidatorButton";

export default function EventValidation() {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById, isLoading: eventsLoading } = useEvents();
  const { validatedTickets, isLoading, error } = useEventValidation(eventId!);
  const { getStatusColor, getStatusIcon, getStatusText } = useTicketStatus();
  const { ticketCount, isLoading: isLoadingCount, error: countError } = useTicketCount(eventId!);

  const event = getEventById(eventId!);

  if (eventsLoading) {
    return (
      <Box>
        <Header title="Cargando..." showBackButton backToEvents />
        <Center h="calc(100vh - 80px)">
          <VStack>
            <Spinner size="xl" color="brand.500" />
            <Text color="gray.400">Cargando evento...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box>
        <Header title="Evento no encontrado" showBackButton backToEvents />
        <Container maxW="md" py={6}>
          <Alert status="error" borderRadius="md" bg="red.900" color="red.200">
            <AlertIcon />
            El evento solicitado no existe
          </Alert>
        </Container>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <Header title={event.name} showBackButton backToEvents />
        <Center h="calc(100vh - 80px)">
          <VStack>
            <Spinner size="xl" color="brand.500" />
            <Text color="gray.400">Cargando datos...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box>
      <Header title={event.name} showBackButton backToEvents />

      <Container maxW="md" py={4} px={4}>
        <VStack spacing={4} align="stretch">
          {/* Botones para iniciar validadores */}
          <VStack spacing={3} align="stretch">
            {!event.active && (
              <Alert status="info" borderRadius="md" bg="blue.900" color="blue.200">
                <AlertIcon />
                Este evento no está disponible. Solo puedes ver las estadísticas de ventas.
              </Alert>
            )}
            <QRValidatorButton eventId={eventId!} isDisabled={!event.active} />
            <ManualValidatorButton eventId={eventId!} isDisabled={!event.active} />
          </VStack>

          {/* Estadísticas de Tickets */}
          <Card bg="gray.800" borderColor="gray.700">
            <CardBody p={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900" textAlign="center">
                  Estadísticas del Evento
                </Text>

                {isLoadingCount ? (
                  <Center py={4}>
                    <VStack>
                      <Spinner size="md" color="brand.500" />
                      <Text fontSize="sm" color="whiteAlpha.700">
                        Cargando estadísticas...
                      </Text>
                    </VStack>
                  </Center>
                ) : countError ? (
                  <Alert status="error" borderRadius="md" bg="red.900" color="red.200">
                    <AlertIcon />
                    {countError}
                  </Alert>
                ) : ticketCount && ticketCount.count.length > 0 ? (
                  <VStack spacing={3} w="full">
                    {ticketCount.count.map((count, index) => {
                      const pending = count.count - count.used;
                      return (
                        <Box key={index} w="full" p={3} bg="gray.700" borderRadius="md" border="1px" borderColor="gray.600">
                          <Text fontSize="sm" fontWeight="medium" color="whiteAlpha.800" mb={2}>
                            {count.type}
                          </Text>
                          <VStack spacing={2} w="full">
                            <HStack justify="space-between" w="full">
                              <HStack>
                                <Users size={16} color="var(--chakra-colors-blue-400)" />
                                <Text fontSize="sm" color="whiteAlpha.700">
                                  Vendidos
                                </Text>
                              </HStack>
                              <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                                {count.count}
                              </Text>
                            </HStack>
                            <HStack justify="space-between" w="full">
                              <HStack>
                                <CheckCircle size={16} color="var(--chakra-colors-green-400)" />
                                <Text fontSize="sm" color="whiteAlpha.700">
                                  Ingresaron
                                </Text>
                              </HStack>
                              <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                                {count.used}
                              </Text>
                            </HStack>
                            <HStack justify="space-between" w="full">
                              <HStack>
                                <Clock size={16} color="var(--chakra-colors-orange-400)" />
                                <Text fontSize="sm" color="whiteAlpha.700">
                                  Por ingresar
                                </Text>
                              </HStack>
                              <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                                {pending}
                              </Text>
                            </HStack>
                          </VStack>
                        </Box>
                      );
                    })}
                  </VStack>
                ) : (
                  <Text fontSize="sm" color="whiteAlpha.600" textAlign="center">
                    No hay datos de tickets disponibles
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Últimas Validaciones */}
          <Card bg="gray.800" borderColor="gray.700">
            <CardBody p={4}>
              <VStack spacing={3} align="stretch">
                <Box display="flex" alignItems="center" gap={2}>
                  <History size={20} color="#9CA3AF" />
                  <Text fontWeight="semibold" color="whiteAlpha.900">
                    Últimas Validaciones
                  </Text>
                </Box>

                {error && (
                  <Alert status="error" borderRadius="md" bg="red.900" color="red.200">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {validatedTickets.length === 0 ? (
                  <Center py={8}>
                    <VStack>
                      <Text color="gray.500">No hay tickets validados aún</Text>
                      <Text color="gray.600" fontSize="sm">
                        Usa el validador para escanear tickets
                      </Text>
                    </VStack>
                  </Center>
                ) : (
                  <VStack spacing={2} align="stretch" maxH="300px" overflowY="auto">
                    {validatedTickets.map((ticket) => (
                      <Box key={ticket.id}>
                        <Box p={3} bg="gray.700" borderRadius="md" border="1px" borderColor="gray.600">
                          <VStack align="stretch" spacing={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Text fontSize="sm" fontFamily="mono" color="gray.300">
                                {ticket.ticketId}
                              </Text>
                              <Badge colorScheme={getStatusColor(ticket.status)} variant="solid" display="flex" alignItems="center" gap={1}>
                                {getStatusIcon(ticket.status) &&
                                  (() => {
                                    const IconComponent = getStatusIcon(ticket.status);
                                    return IconComponent ? <IconComponent size={16} /> : null;
                                  })()}
                                {getStatusText(ticket.status)}
                              </Badge>
                            </Box>

                            <Text fontSize="xs" color="gray.500">
                              {formatDate(ticket.validatedAt)}
                            </Text>
                          </VStack>
                        </Box>

                        {validatedTickets.indexOf(ticket) < validatedTickets.length - 1 && <Divider borderColor="gray.700" />}
                      </Box>
                    ))}
                  </VStack>
                )}
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}
