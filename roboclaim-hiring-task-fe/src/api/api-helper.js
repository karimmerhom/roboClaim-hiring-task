import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export function globalErrorHandler(err) {
    try {
        toast({
            title: "Oops",
            description: err.response?.data?.error || "An error occurred",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Oops",
            description: "An unknown error occurred. Please check your internet connection.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
    return Promise.reject(err);
}
