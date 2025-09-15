import { Center, VStack, Text, Input, Button } from "@chakra-ui/react";
import { useManualValidation } from "../hooks/useManualValidation";
import ValidationResultModal from "./ValidationResultModal";
import { Event } from "../types";

export default function ManualValidator({ event }: { event: Event }) {
  const { manualInput, setManualInput, validationResult, validationStatus, validationMessage, isValidating, isOpen, validateManualTicket, handleClose } =
    useManualValidation(event);

  return (
    <>
      <Center h="100vh">
        <VStack gap={6} p={6} w="full" maxW="400px">
          <Text color="whiteAlpha.900" fontSize="xl" fontWeight="bold" textAlign="center">
            Validación Manual
          </Text>
          <Text color="whiteAlpha.700" fontSize="md" textAlign="center">
            Ingresa el código del ticket
          </Text>

          <VStack gap={4} w="full">
            <Input
              placeholder={`${event.ticketPrefix}-XXXXXXXX`}
              value={`${event.ticketPrefix}-${manualInput}`}
              onChange={(e) => {
                const value = e.target.value;
                if (value.startsWith(`${event.ticketPrefix}-`)) {
                  setManualInput(value.slice(event.ticketPrefix.length + 1).toUpperCase());
                } else {
                  setManualInput("");
                }
              }}
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.300"
              color="whiteAlpha.900"
              _placeholder={{ color: "whiteAlpha.600" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
              }}
              size="lg"
              maxLength={14}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateManualTicket();
                }
              }}
            />

            <Button
              colorScheme="brand"
              size="lg"
              w="full"
              onClick={validateManualTicket}
              isLoading={isValidating}
              loadingText="Validando..."
              isDisabled={!manualInput.trim()}
            >
              Validar Ticket
            </Button>
          </VStack>
        </VStack>
      </Center>

      {/* Modal de resultado */}
      {validationResult && (
        <ValidationResultModal
          isOpen={isOpen}
          onClose={handleClose}
          result={validationResult}
          status={validationStatus}
          validationMessage={validationMessage}
          isValidating={isValidating}
        />
      )}
    </>
  );
}
