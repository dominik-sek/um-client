import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../api/fetch-all-users';
import UserCard from '../../components/shared/user-card';
import { Box, Button, Flex, HStack, Spinner, Text, useDisclosure, Wrap } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import React from 'react';
import { useUserStore } from '../../../store';
import AddUserModal from './components/add-user-modal/add-user-modal';
import SearchBar from '../../components/shared/search/search-bar';
import DeleteUserModal from './components/delete-user-modal/delete-user-modal';
import { useLocation } from 'react-router-dom';

const Users = (props: { onOpenAdd?: () => void, onOpenDelete?: () => void }): JSX.Element => {
  const userStore = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { state } = useLocation();
  console.log(state);

  const { data, isLoading, isError, error, refetch } = useQuery('users', fetchAllUsers, {
    refetchOnWindowFocus: false,
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    if (data) {
      setFilteredUsers(data);
    }

  }, [data]);

  React.useEffect(() => {
    if (data) {
      const results = data.filter((user: any) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(results);
    }
  }, [searchTerm]);


  if (isError) {
    console.log('error', error);
  }
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]); //plain array
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== value));
    }
  };

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
          <HStack>

            <Button leftIcon={<DeleteIcon />} colorScheme={'red'}
                    onClick={props.onOpenDelete ?? onDeleteOpen}
                    disabled={checkedItems.length === 0}
            >
              <Text>
                Delete selected
              </Text>
            </Button>
            <Button id={'add-user-btn'} leftIcon={<AddIcon />} colorScheme={'whatsapp'}
                    onClick={props.onOpenAdd ?? onOpen}>
              <Text>
                Add new user
              </Text>
            </Button>

          </HStack>
          <AddUserModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
          <DeleteUserModal isOpen={isDeleteOpen} onClose={onDeleteClose}
                           usersChecked={checkedItems} users={data}
                           refetch={refetch} />
        </motion.div>

      </Box>
      {isLoading ? (
        <Flex justifyContent={'center'}>
          <Spinner size={'lg'} />
        </Flex>
      ) : (
        <Wrap spacing={8} w={'100%'} h={'100%'} align={'center'} justify={'space-around'}>
          {
            filteredUsers.map((user: any, index: number) => {
              if (userStore.user.id === user.id) {
                return null;
              }
              return (
                <motion.div
                  whileInView={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  key={user.id}
                >
                  <UserCard user={user} key={user.id} onChange={(e) => handleChecked(e)}
                  />
                </motion.div>
              );
            })

          }

        </Wrap>
      )}

    </Flex>
  );
};
export default Users;