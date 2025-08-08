import {
  Box,
  Container,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Image,
  Center,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { username, password, error, isAuthenticated, isLoading, handleUsernameChange, handlePasswordChange, handleSubmit } = useLogin();

  if (isAuthenticated) {
    return <Navigate to="/events" replace />;
  }

  return (
    <Container maxW="sm" h="100vh" display="flex" alignItems="center">
      <Box w="full" bg="gray.800" p={8} borderRadius="xl" boxShadow="xl">
        <VStack spacing={6}>
          <Center mb={6}>
            <Box textAlign="center">
              <Image 
                src="/logotipo-boltick-white.png" 
                alt="Boltick Logo" 
                maxW="200px" 
                h="auto" 
                mx="auto" 
                mb={4}
                objectFit="contain"
              />
              <Text color="gray.400" fontSize="sm">
                Sistema de validación de tickets
              </Text>
            </Box>
          </Center>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel color="gray.300">Usuario</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  bg="gray.700"
                  border="1px"
                  borderColor="gray.600"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #006DFF" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">Contraseña</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  bg="gray.700"
                  border="1px"
                  borderColor="gray.600"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #006DFF" }}
                />
              </FormControl>

              {error && (
                <Alert status="error" borderRadius="md" bg="red.900" color="red.200">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Button type="submit" colorScheme="brand" size="lg" w="full" isLoading={isLoading} loadingText="Iniciando sesión...">
                Iniciar Sesión
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
}
