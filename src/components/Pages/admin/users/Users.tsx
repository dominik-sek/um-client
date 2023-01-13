import { useQuery } from 'react-query';
import LoadingScreen from '../../../shared/loading-screen';
import { fetchAllUsers } from '../../../../api/fetch-all-users';
import UserCard from '../../../shared/user-card';
import {
  Avatar,
  Box,
  Button,
  Flex, FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import React from 'react';
import { useUserStore } from '../../../../../store';
import AddUserModal from './add-user-modal';
import { AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import AutocompleteSearchbar from '../../../shared/search/autocomplete-searchbar';
import SearchBar from '../../../shared/search/search-bar';

const Users = (): JSX.Element => {
  const userStore = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError, error } = useQuery('users', fetchAllUsers, {
    refetchOnWindowFocus: false,
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>(data);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    console.log('error', error);
  }

  React.useEffect(() => {
    const results = data?.filter((user: any) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(results);
  }, [searchTerm]);

  return (
    <Flex flexDir={'column'} gap={10}>
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
          <SearchBar onChange={handleChange} />
        </Box>
        <motion.div>
          <Button id={'add-user-btn'} leftIcon={<AddIcon />} colorScheme={'whatsapp'}
                  onClick={onOpen}>
            <Text>
              Add new user
            </Text>
          </Button>
          <AddUserModal isOpen={isOpen} onClose={onClose} />
        </motion.div>

      </Box>
      <Wrap spacing={8} w={'100%'} h={'100%'} align={'center'} justify={'space-around'}>

        {
          filteredUsers.map((user: any) => {
            if (userStore.user.id === user.id) {
              return null;
            }
            return (
              <motion.div
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                key={user.id}
              >
                <UserCard user={user} key={user.id} />
              </motion.div>
            );
          })

        }

      </Wrap>
    </Flex>
  );
};
export default Users;