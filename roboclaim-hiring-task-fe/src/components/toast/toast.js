import { useToast } from "@chakra-ui/react";

const Toast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description,
    status = "info",
    duration = 5000,
    position = "bottom-center",
  }) => {
    toast({
      title,
      description,
      status,
      duration,
      position,
      isClosable: true,
    });
  };

  return showToast;
};

export default Toast;
