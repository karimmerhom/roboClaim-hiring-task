import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { uploadFiles } from "@/api/files"; 

const FileUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const validFileTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const invalidFiles = selectedFiles.filter(
      (file) => !validFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError("Some files have invalid types. Only PDF, JPG, PNG, or JPEG files are allowed.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setError("");
  };

  const handleFileUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file before uploading.");
      return;
    }
    setIsUploading(true);
    try {
      await uploadFiles(files);
      onUpload();
      handleClose();
    } catch(e) {
      console.log(e)
      setError("An error occurred while uploading the files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileRemove = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    setError("");
  };

  const handleClose = () => {
    setFiles([]);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg="background.secondary">
        <ModalHeader color="text.primary">Upload Files</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!error}>
            <Text color="text.secondary" mb={2}>
              Choose files to upload (PDF, JPG, PNG, JPEG)
            </Text>
            <Input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
              ref={inputRef}
              multiple
            />
            <Button
              as="label"
              htmlFor="file-upload"
              variant="outline"
              px={4}
              py={2}
              borderRadius="md"
              color="text.primary"
              borderColor="button.backgroundColor"
              _hover={{ bg: "button.backgroundColor" }}
              _active={{ bg: "button.backgroundColor" }}
            >
              Choose Files
            </Button>
            {files.length > 0 && (
              <VStack align="start" mt={4} spacing={2}>
                {files.map((file, index) => (
                  <div key={index}>
                    <Text color="text.secondary" fontSize="sm">
                      {file.name}
                    </Text>
                    <Button
                      mt={1}
                      size="sm"
                      variant="link"
                      color="text.danger"
                      onClick={() => handleFileRemove(file)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </VStack>
            )}
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button color="text.primary" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            bg="button.primaryBackground"
            color="button.primaryText"
            ml={3}
            onClick={handleFileUpload}
            isLoading={isUploading}
            loadingText="Uploading..."
          >
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;
