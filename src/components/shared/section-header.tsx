import { Box, Button, HStack, Text } from '@chakra-ui/react';
import SearchBar from './search/search-bar';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import React from 'react';

interface SectionHeaderProps {
  deleteText?: string;
  addText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteButton?: boolean;
  onAddClick?: () => void;
  children?: React.ReactNode;
  search?: boolean;
}

export const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <Box
      w={'full'}
      p={4}
      bg={''}
      display={'flex'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={{ base: 4, md: 10 }}
      justifyContent={{ base: 'center', md: 'space-between' }}
      alignItems={{ base: 'center', md: 'flex-start' }}
    >
      <Box w={'40%'}>
        {props.onChange && !props.search && <SearchBar onChange={props.onChange} />}
      </Box>
      {props.children ? (
        props.children
      ) : (
        <HStack>
          {props.deleteButton && (
            <Button leftIcon={<DeleteIcon />} colorScheme={'red'}>
              <Text>
                {props.deleteText}
              </Text>
            </Button>
          )}

          <Button id={'add-user-btn'} leftIcon={<AddIcon />} onClick={props.onAddClick} colorScheme={'whatsapp'}>
            {props.addText}
          </Button>
        </HStack>
      )}

    </Box>
  );
};