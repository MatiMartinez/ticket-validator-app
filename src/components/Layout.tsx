import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" bg="gray.900" color="whiteAlpha.900">
      {children}
    </Box>
  );
}
