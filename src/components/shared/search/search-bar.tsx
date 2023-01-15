import { Box, BoxProps, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBarProps extends BoxProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDownInput?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange, value, inputRef, onKeyDownInput, ...rest }: SearchBarProps) => {

  return (
    <Box {...rest}>
      <InputGroup onKeyDown={onKeyDownInput}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input type='text' ref={inputRef} placeholder='Search' onChange={onChange} />
        {rest.children}
      </InputGroup>
    </Box>
  );
};
export default SearchBar;