import { Box, BoxProps, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

interface SearchBarProps extends BoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDownInput?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}

const SearchBar = ({ onChange, value, inputRef, onKeyDownInput,searchPlaceholder, ...rest }: SearchBarProps) => {
  const { t } = useTranslation();
  const debouncedOnChange = debounce(onChange, 200);
  return (
    <Box {...rest}>
      <InputGroup onKeyDown={onKeyDownInput}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input bg={useColorModeValue('gray.200', 'gray.700')} type='search' ref={inputRef} placeholder={searchPlaceholder || t('search') as string}
               onChange={debouncedOnChange} />
        {rest.children}
      </InputGroup>
    </Box>
  );
};
export default SearchBar;