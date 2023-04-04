import React, { useState } from 'react';
import { Box, List, useColorModeValue } from '@chakra-ui/react';
import SearchBar from './search-bar';
import { motion } from 'framer-motion';

type AutocompleteSearchbarProps = {
  suggestions: string[],
  onSuggestionSelected: (suggestion: string) => void
} & React.ComponentProps<typeof SearchBar>;
type AutocompleteSearchbarPropsOmit = Omit<AutocompleteSearchbarProps, "onChange">

const AutocompleteSearchbar = ({ suggestions, onSuggestionSelected,searchPlaceholder, ...rest }: AutocompleteSearchbarPropsOmit) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
    const value = event.target.value;
    const filtered = suggestions.filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()));
    setFilteredSuggestions(filtered);
    setHighlightedIndex(-1);
  };
  const handleLostFocus = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!showSuggestions) {
          setFilteredSuggestions(suggestions);
          setShowSuggestions(true);
        }
        if (highlightedIndex < filteredSuggestions.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex !== -1) {
          onSuggestionSelected(filteredSuggestions[highlightedIndex]);
          setSelectedSuggestion(filteredSuggestions[highlightedIndex]);
          setShowSuggestions(false);
        }
        break;
    }
  };
  const ref = React.useRef<HTMLInputElement>(document.createElement('input'));
  const hoverColor = useColorModeValue('gray.200', 'gray.700');
  const suggestionBg = useColorModeValue('white', 'gray.800');

  return (
    <SearchBar onKeyDownInput={handleKeyPress}
               inputRef={ref}
               value={selectedSuggestion}
               position={'relative'}
               {...rest}
                searchPlaceholder={searchPlaceholder}
               onBlur={handleLostFocus}
               onChange={(e) => handleOnChange(e)}>
      <Box position={'absolute'} top={'100%'} height={'100%'} left={0} right={0}
           display={showSuggestions ? 'flex' : 'none'}
           zIndex={99}>
        <List width={'100%'} h={'100%'} zIndex={99}>
          {filteredSuggestions.map((suggestion: string, index: number) => {
            const hasBottomBorder = index === filteredSuggestions.length - 1;
            return (
              <Box
                borderX={'1px solid'}
                borderBottomRadius={hasBottomBorder ? '9px' : ''}
                borderBottom={hasBottomBorder ? '1px solid' : ''}
                borderColor={'inherit'}
                w={'100%'} pl={10} pt={2}
                bg={highlightedIndex === index ?
                  hoverColor :
                  suggestionBg}
                h={'100%'}
                key={suggestion}
                cursor={'pointer'}
                _hover={{ hoverColor }}
                onClick={() => {
                  onSuggestionSelected(suggestion);
                  ref.current.value = suggestion;
                  setShowSuggestions(false);
                }}
              >
                <motion.div
                  whileInView={{ opacity: 1 }}
                  initial={{ opacity: 0 }}>
                  {suggestion}
                </motion.div>
              </Box>

            );
          })}
        </List>
      </Box>
    </SearchBar>
  );
};
export default AutocompleteSearchbar;
