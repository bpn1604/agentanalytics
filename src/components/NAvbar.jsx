import React from 'react';
import { Box, Flex, Spacer, Link, Button, useDisclosure, VStack, HStack, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <Link href="/" color="white" fontSize="xl" fontWeight="bold"> Logo</Link>
        <Spacer />
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            colorScheme="white"
            aria-label="Toggle Navigation"
          />
        </Box>
        <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }}>
          <HStack spacing={4}>
            <Link href="/" color="white">Home</Link>
            <Link href="/" color="white">About</Link>
            <Link href="/" color="white">Services</Link>
            <Link href="/" color="white">Contact</Link>
          </HStack>
        </Box>
      </Flex>
      
    </Box>
  );
};

export default Navbar;
