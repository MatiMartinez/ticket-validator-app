import {
  Box,
  Container,
  VStack,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Button,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEventSelection } from "../hooks/useEventSelection";
import Header from "../components/Header";

export default function EventSelection() {
  const { events, isLoading, error, handleEventSelect } = useEventSelection();

  if (isLoading) {
    return (
      <Box>
        <Header title="Seleccionar Evento" />
        <Center h="calc(100vh - 80px)">
          <VStack>
            <Spinner size="xl" color="brand.500" />
            <Text color="gray.400">Cargando eventos...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Header title="Seleccionar Evento" />
        <Container maxW="md" py={6}>
          <Alert status="error" borderRadius="md" bg="red.900" color="red.200">
            <AlertIcon />
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Header title="Seleccionar Evento" />

      <Container maxW="md" py={6}>
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Text color="gray.400" fontSize="sm">
              Selecciona el evento para comenzar la validación
            </Text>
          </Box>

          <SimpleGrid columns={1} spacing={4}>
            {events.map((event) => (
              <Card
                key={event.id}
                bg="gray.800"
                borderColor="gray.700"
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  borderColor: "brand.500",
                }}
              >
                <CardBody p={0}>
                  <Box p={4}>
                    <VStack spacing={4}>
                      <Heading size="md" color="whiteAlpha.900" textAlign="center">
                        {event.name}
                      </Heading>

                      <Text color="brand.300" fontSize="sm" textAlign="center" fontWeight="medium">
                        {event.date}
                      </Text>

                      <Button colorScheme="brand" size="md" w="full" onClick={() => handleEventSelect(event.id)}>
                        Ir a Validar
                      </Button>
                    </VStack>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {events.length === 0 && (
            <Center py={12}>
              <VStack>
                <Text color="gray.500" fontSize="lg">
                  No hay eventos disponibles
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Contacta al administrador para más información
                </Text>
              </VStack>
            </Center>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
