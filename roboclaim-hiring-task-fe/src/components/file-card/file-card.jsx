"use client";
import React from "react";
import {
  Box,
  Text,
  VStack,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { BiSolidFilePng, BiSolidFileJpg, BiSolidFilePdf } from "react-icons/bi";
import { SiJpeg } from "react-icons/si";
import { useRouter } from "next/navigation";

const fileIcon = {
  png: <BiSolidFilePng size={50} />,
  jpg: <BiSolidFileJpg size={50} />,
  jpeg: <SiJpeg size={50} />,
  pdf: <BiSolidFilePdf size={50} />,
};

const FileCard = ({ file }) => {
  const router = useRouter();

  const fileExtension = file.fileName.split(".").pop().toLowerCase();

  const Icon = fileIcon[fileExtension] || null;

  const fileSizeInKB = (file.fileSize / 1024).toFixed(2);

  const handleClick = () => {
    router.push(`/portal/file/${file.id}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={"border.secondaryColor"}
      overflow="hidden"
      boxShadow="secondaryShadow"
      p={4}
      m={2}
      backgroundColor="background.primary"
      _hover={{ transform: "scale(1.05)", transition: "all 0.2s ease" }}
      cursor="pointer"
      onClick={handleClick}
      transition="transform 0.2s ease"
    >
      <VStack align="stretch" spacing={4}>
        {Icon && (
          <Box textAlign="center" color="icons.secondaryColor" mb={3}>
            {Icon}
          </Box>
        )}

        <Text
          fontSize="xl"
          fontWeight="bold"
          color={"text.primary"}
          isTruncated
        >
          {file.fileName}
        </Text>

        <HStack spacing={2} justify="space-between" align="center">
          <Text color="text.secondary" fontSize="sm">
            Type: {file.fileType}
          </Text>
          <Text color="text.secondary" fontSize="sm">
            Size: {fileSizeInKB} KB
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FileCard;
