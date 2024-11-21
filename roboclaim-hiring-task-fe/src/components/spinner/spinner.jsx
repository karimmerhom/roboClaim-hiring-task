import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const Loader = ({ size = "md", thickness = 3, speed = "0.65s", color = "button.primaryText", ...props }) => {
  const spinner = (
    <Spinner
      size={size}
      thickness={thickness}
      speed={speed}
      color={color}
      {...props}
    />
  );
  return spinner;
};

export default Loader;
