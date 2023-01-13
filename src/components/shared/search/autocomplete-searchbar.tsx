import React, { useState } from 'react';
import { Input, Box, List } from '@chakra-ui/react';

type AutocompleteSearchbarProps = {
  suggestions: any[],
  suggestionToString: (suggestion: any) => string,
  onSuggestionSelected: (suggestion: any) => void
}

const AutocompleteSearchbar: React.FC<AutocompleteSearchbarProps> = ({
                                                                       suggestions,
                                                                       suggestionToString,
                                                                       onSuggestionSelected,
                                                                     }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    // filter suggestions based on input value
    const newFilteredSuggestions = suggestions.filter(
      (suggestion) => suggestionToString(suggestion).toLowerCase().includes(e.target.value.toLowerCase()),
    );

    //@ts-ignore
    setFilteredSuggestions(newFilteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setInputValue(suggestionToString(suggestion));
    setFilteredSuggestions([]);
    onSuggestionSelected(suggestion);
  };

  return (
    <Box>
      <Input
        placeholder='Search...'
        value={inputValue}
        onChange={handleInputChange}
      />
      <List>
        {filteredSuggestions.map((suggestion) => (
          <Box key={suggestionToString(suggestion)}
               onClick={() => handleSuggestionClick(suggestion)}>{suggestionToString(suggestion)}</Box>
        ))}
      </List>
    </Box>
  );
};

export default AutocompleteSearchbar;
