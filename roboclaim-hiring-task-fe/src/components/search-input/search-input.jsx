// components/SearchInput.js

import React from 'react';
import { Input } from '@chakra-ui/react';

const SearchInput = ({ placeholder, value, onChange, width = 300, ...props }) => {
  return (
    <Input
      placeholder={placeholder}
      _placeholder={{ color: 'text.secondary' }}
      width={width}
      borderWidth={2}
      color={'text.primary'}
      borderColor={"border.secondaryColor"}
      bg={"background.secondary"}
      boxShadow={'secondaryShadow'}
      borderRadius={100}
      value={value}
      onChange={onChange}
      {...props} 
    />
  );
};

export default SearchInput;
