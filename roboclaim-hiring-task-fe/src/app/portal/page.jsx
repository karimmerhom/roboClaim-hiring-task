"use client";
import React, { useEffect, useState } from "react";
import { getFiles } from "@/api/files";
import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  Text,
  Flex,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import SearchInput from "@/components/search-input/search-input";
import FileCard from "@/components/file-card/file-card";
import FileUploadModal from "@/components/upload-modal/upload-modal";

export default function Page() {
  const [files, setFiles] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await getFiles();
      setFiles(result.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredFiles = files?.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4} align="center">
        <Flex align="center">
          <Text fontSize={18} color="text.primary" fontWeight="semibold">
            My Files
          </Text>
          <IconButton
            ml={4}
            bg="icons.secondaryColor"
            rounded="full"
            icon={<HiOutlinePlus />}
            aria-label="Upload File"
            onClick={handleOpen}
            h={8}
          />
        </Flex>
        <SearchInput
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Flex>

      {loading ? (
        <Center h="70vh">
          <Spinner size="xl" color="icons.secondaryColor" />
        </Center>
      ) : error ? (
        <Center h="70vh" display="flex" flexDir="column">
          <Text fontSize="xl" color="text.danger" fontWeight="semibold">
            Failed to load files
          </Text>
          <Text color="text.secondary">Please try again later.</Text>
        </Center>
      ) : filteredFiles?.length === 0 ? (
        <Center h="70vh" display="flex" flexDir="column">
          <Image
            src="/assets/no_results.png"
            alt="No files available"
            boxSize="150px"
            mb={4}
            mx="auto"
          />
          <Text fontSize="xl" color="text.secondary">
            No files available
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
          {filteredFiles?.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </SimpleGrid>
      )}

      <FileUploadModal
        isOpen={isOpen}
        onClose={handleClose}
        onUpload={fetchFiles}
      />
    </Box>
  );
}
