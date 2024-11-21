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
} from "@chakra-ui/react";
import { uploadFile } from "@/api/files";

const FileUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const validFileTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Invalid file type. Only PDF, JPG, PNG, or JPEG files are allowed.");
      setFile(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }
    setIsUploading(true);
    try {
      await uploadFile(file);
      onUpload();
      handleClose();
    } catch {
      setError("An error occurred while uploading the file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClose = () => {
    setFile(null);
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
        <ModalHeader color="text.primary">Upload File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!error}>
            <Text color="text.secondary" mb={2}>
              Choose a file to upload (PDF, JPG, PNG, JPEG)
            </Text>
            <Input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
              ref={inputRef}
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
              Choose File
            </Button>
            {file && (
              <div>
                <Text color="text.secondary" mt={2} fontSize="sm">
                  Selected File: {file.name}
                </Text>
                <Button mt={2} size="sm" variant="link" color="text.danger" onClick={handleFileRemove}>
                  Remove File
                </Button>
              </div>
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
