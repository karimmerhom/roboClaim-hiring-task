import React, { useState, useContext } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  FormControl,
  Text,
  Button,
} from "@chakra-ui/react";
import { ThemeContext } from "@/context/theme";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = ({
  width,
  height,
  value,
  id,
  name,
  placeholder,
  onChange,
  error,
  onBlur,
  isInvalid,
  secureText
}) => {
  const themCtx = useContext(ThemeContext);
  const [show, setShow] = useState(!secureText);
  return (

    <FormControl w={"100%"} isInvalid={isInvalid}>
      <FormLabel htmlFor="email" variant={"formLabel"} >
        {name}
      </FormLabel>
      <InputGroup >
        <Input
          id={id}
          width={width}
          height={height}   
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={show ? "text" : "password"}
          variant={'textFormField'}
        />
        {secureText && <InputRightElement height={'100%'}>

          <Button
            aria-label="toggle text visibility"
            variant={'formFieldVisibilityButton'}
            onClick={() => setShow(!show)}
          >
            {show ? (
              <MdVisibilityOff
                size={25}
                color={themCtx.theme.colors['border']['primaryColor']}
              />
            ) : (
              <MdVisibility
                size={25}
                color={themCtx.theme.colors['border']['primaryColor']}
              />
            )}
          </Button>

        </InputRightElement>}
      </InputGroup>
        <Text variant={'formError'}>{isInvalid&&error}</Text>
    </FormControl>
  );
};

export default InputField;
