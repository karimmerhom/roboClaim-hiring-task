'use client';
import React, { useEffect, useState } from 'react';
import { getFile } from '@/api/files';
import { Box, Text, VStack, Divider, Stack, Heading, Spinner } from '@chakra-ui/react';

const Page = ({ params }) => {
  const { id } = params;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFileDetails = async () => {
    try {
      setLoading(true);
      const result = await getFile(id);
      setFile(result.data);
      setLoading(false);
    } catch {
      setError('Failed to load file details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFileDetails();
  }, [id]);

  if (loading) {
    return (
      <Box w="100%" pb={20} display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Spinner size="xl" color="icons.secondaryColor" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" pb={20} display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Text fontSize="xl" color="red.500" fontWeight="semibold">{error}</Text>
      </Box>
    );
  }

  return (
    <Box w="100%" py={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="auto" px={4}>
      <VStack spacing={4} align="stretch" mb={6} w="full" maxW="1200px">
        <Box w="full" bg="background.primary" boxShadow="secondaryShadow" p={6} borderRadius="md" mb={4}>
          <Text fontSize={20} color="text.primary" fontWeight="semibold"><strong>File Name:</strong> {file?.fileName}</Text>
          <Text fontSize={20} color="text.primary" fontWeight="semibold"><strong>File Size:</strong> {(file?.fileSize / 1024).toFixed(2)} KB</Text>
          <Text fontSize={20} color="text.primary" fontWeight="semibold"><strong>File Type:</strong> {file?.fileType}</Text>
        </Box>
      </VStack>

      <VStack spacing={4} align="stretch" mb={6} w="full" maxW="1200px">
        <Heading as="h3" size="lg" color="text.primary">Metadata:</Heading>
        <Stack spacing={2}>
          {file?.metadata && Object.entries(file.metadata).map(([key, value]) => (
            <Box key={key} w="full" bg="background.primary" boxShadow="secondaryShadow" p={4} borderRadius="md">
              <Text fontSize={18} fontWeight="semibold" color="text.primary">{key}:</Text>
              <Text fontSize={16} color="text.secondary">{JSON.stringify(value)}</Text>
              <Divider borderColor="border.tertiaryColor" my={2} />
            </Box>
          ))}
        </Stack>
      </VStack>

      <VStack spacing={4} align="stretch" w="full" maxW="1200px">
        <Heading as="h3" size="lg" color="text.primary">Text Content:</Heading>
        <Box
          w="full"
          p={6}
          bg="background.primary"
          boxShadow="secondaryShadow"
          borderRadius="md"
          maxH="60vh"
          overflowY="auto"
          mb={6}
          whiteSpace="pre-line"
        >
          <Text fontSize={16} color="text.primary">{file?.text}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Page;
