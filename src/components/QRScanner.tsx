import { Box, Button, VStack, Text, Center, Spinner } from "@chakra-ui/react";
import { useQRScannerOnly } from "../hooks/useQRScannerOnly";
import ValidationResultModal from "./ValidationResultModal";

export default function QRScanner() {
  const { isLoading, qrResult, validationStatus, isValidating, isOpen, handleClose, restartCamera } = useQRScannerOnly();

  return (
    <>
      {/* Cargando */}
      {isLoading && (
        <Center position="absolute" top={0} left={0} right={0} bottom={0} bg="gray.900">
          <VStack gap={4}>
            <Spinner size="xl" color="brand.500" />
            <Text color="gray.400">Iniciando cámara...</Text>
          </VStack>
        </Center>
      )}

      {/* Área de la cámara */}
      <VStack gap={4} w="full" aspectRatio={1} position="absolute" top="15%" left="50%" transform="translateX(-50%)" bg="black">
        <div id="qr-reader" style={{ width: "100%", height: "100%" }}></div>
        <Text color="whiteAlpha.900" fontSize="md" fontWeight="medium" textAlign="center">
          Coloca el código QR dentro del marco
        </Text>
      </VStack>

      {/* Botones QR */}
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
        <Button colorScheme="brand" size="sm" onClick={restartCamera} isLoading={isLoading} loadingText="Reiniciando...">
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
          validationMessage={null}
          isValidating={isValidating}
        />
      )}
    </>
  );
}
