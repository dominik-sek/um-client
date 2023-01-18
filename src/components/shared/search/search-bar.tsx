import { Box, BoxProps, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

interface SearchBarProps extends BoxProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDownInput?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange, value, inputRef, onKeyDownInput, ...rest }: SearchBarProps) => {
  const { t } = useTranslation();
  return (
    <Box {...rest}>
      <InputGroup onKeyDown={onKeyDownInput}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input bg={useColorModeValue('gray.200', 'gray.700')} type='search' ref={inputRef} placeholder={t('search')}
               onChange={onChange} />
        {rest.children}
      </InputGroup>
    </Box>
  );
};
export default SearchBar;