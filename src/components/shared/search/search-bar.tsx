import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = (props: SearchBarProps) => {

  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input type='text' placeholder='Search' onChange={props.onChange} />
      </InputGroup>
    </Box>
  );
};
export default SearchBar;