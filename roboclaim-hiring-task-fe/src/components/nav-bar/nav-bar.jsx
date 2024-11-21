'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { ThemeContext } from "@/context/theme";
import { FaSignOutAlt } from "react-icons/fa";
import ThemeButton from "../theme-button/theme-button";
import { signOut } from "@/api/auth";

const NavBar = () => {
  const themCtx = useContext(ThemeContext);
  const router = useRouter();
  const [urlPart, setUrlPart] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    let lastPart = currentPath.split('/').pop();
    lastPart = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    if (!isNaN(lastPart)) {
      setUrlPart(`File ID: ${lastPart}`);
    } else {
      setUrlPart(lastPart);
    }
  }, [router.asPath]);

  return (
    <Box bg="background.primary" px={5} boxShadow="secondaryShadow" borderBottomWidth={2} borderColor="border.secondaryColor">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text color="text.primary" fontSize={24} fontWeight="bold">
          {urlPart || 'Dashboard'}
        </Text>
        <Flex alignItems="center">
          <Box display="flex" flexDirection="row" bg="background.primary" px={2} py={1} borderRadius={100} boxShadow="secondaryShadow" mr={4}>
            <Box transform="scale(0.8)">
              <IconButton 
                onClick={signOut} 
                icon={<FaSignOutAlt color={themCtx?.theme.colors.icons.primaryColor} />} 
                boxShadow="unset"
                aria-label="sign out"
                variant="navButtons"
              />
            </Box>
            <Box transform="scale(0.8)">
              <ThemeButton noShadow />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
