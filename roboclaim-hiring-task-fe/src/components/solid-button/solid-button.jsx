"use client";
import React from "react";
import Loader from "../spinner/spinner";
import { Button } from "@chakra-ui/react";

function SolidButton({ width, height, onClick, isLoading, children }) {
  return (
    <Button
      variant={"solidButton"}
      width={width}
      height={height}
      onClick={onClick}
      isDisabled={isLoading}
      _disabled={{
        opacity: 0.5,
        backgroundColor: "button.primaryBackground",
        _hover: { bg: "button.primaryBackground" },
        cursor: "not-allowed",
      }}
    >
      {isLoading ? <Loader size="md"/> :  children }
    </Button>
  );
}

export default SolidButton;
