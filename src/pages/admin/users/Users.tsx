import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../../api/users';
import UserCard from '../../../components/shared/user-card';
import { Box, Button, Flex, HStack, Spinner, Text, useDisclosure, Wrap } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import React, { useMemo, useEffect } from 'react';
import { useUserStore } from '../../../../store';
import AddUserModal from './components/add-user-modal/add-user-modal';
import SearchBar from '../../../components/shared/search/search-bar';
import DeleteUserModal from './components/delete-user-modal/delete-user-modal';
import EditUserModal from './components/edit-user-modal/edit-user.modal';
import { AddMultipleModal } from './components/add-multiple-modal/add-multiple-modal';
import { FaUpload } from 'react-icons/all';


const Users = (): JSX.Element => {
  const userStore = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isMultipleOpen, onOpen: onMultipleOpen, onClose: onMultipleClose } = useDisclosure();

  const { data, isLoading, isError, error, refetch } = useQuery('users', fetchAllUsers, {
    refetchOnWindowFocus: false,
  });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (data) {
      setFilteredUsers(data);
    }
  }, [data]);
  useEffect(() => {
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
  const [editUser, setEditUser] = React.useState<any>({});
  const handleEditClick = (userId: number) => {
    const user = data?.find((user: any) => user.id === userId);
    setEditUser(user);
    onEditOpen();
  };


  return (
    <Flex flexDir={'column'} gap={10}>
      <Box
        w={'full'}
        p={4}
        display={'flex'}
        flexDir={{ base: 'column', md: 'column' }}
        gap={{ base: 4, md: 4 }}
        justifyContent={{ base: 'center', md: 'space-between' }}
        alignItems={{ base: 'center', md: 'flex-start' }}
      >

        <Flex display={'flex'} justifyContent={'space-between'} w={'100%'}>
          <SearchBar onChange={handleChange} />

          <Wrap spacing={4}>
            <Button leftIcon={<DeleteIcon />} colorScheme={'red'}
                    onClick={onDeleteOpen}
                    disabled={checkedItems.length === 0}
            >
              <Text>
                Delete selected
              </Text>
            </Button>
            <Button id={'add-user-btn'} leftIcon={<AddIcon />} colorScheme={'whatsapp'}
                    onClick={onOpen}>
              <Text>
                Add new user
              </Text>
            </Button>

            <Button id={'add-multiple-btn'} leftIcon={<FaUpload />} colorScheme={'telegram'}
                    onClick={onMultipleOpen}>
              <Text>
                Add multiple users
              </Text>
            </Button>

          </Wrap>

        </Flex>

        <AddUserModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
        <DeleteUserModal isOpen={isDeleteOpen} onClose={onDeleteClose}
                         usersChecked={checkedItems} users={data}
                         refetch={refetch} />
        <EditUserModal isOpen={isEditOpen} onClose={onEditClose} user={editUser} refetch={refetch} />
        <AddMultipleModal isOpen={isMultipleOpen} onClose={onMultipleClose} />

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
                            onEditClick={(userId) => handleEditClick(userId)} />

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