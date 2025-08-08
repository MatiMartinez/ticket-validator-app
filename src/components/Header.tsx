import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text
} from '@chakra-ui/react';
import { ArrowLeft, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  backToEvents?: boolean;
}

export default function Header({ title, showBackButton = false, onBack, backToEvents = false }: HeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backToEvents) {
      navigate('/events');
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <>
      <Box
        bg="gray.800"
        borderBottom="1px"
        borderColor="gray.700"
        px={4}
        py={3}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={3}>
            {showBackButton && (
              <IconButton
                aria-label="Volver"
                icon={<ArrowLeft size={20} />}
                variant="ghost"
                size="sm"
                onClick={handleBack}
              />
            )}
            <Heading size="md" color="whiteAlpha.900">
              {title}
            </Heading>
          </Flex>

          <IconButton
            aria-label="Menú"
            icon={<Menu size={20} />}
            variant="ghost"
            size="sm"
            onClick={onOpen}
          />
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
            <Text color="whiteAlpha.900">Menú</Text>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4} mt={4}>
              <Button
                leftIcon={<LogOut size={16} />}
                variant="ghost"
                justifyContent="flex-start"
                onClick={handleLogout}
                color="red.400"
                _hover={{ bg: 'red.900', color: 'red.300' }}
              >
                Cerrar Sesión
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
