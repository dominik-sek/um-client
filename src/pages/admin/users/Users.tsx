import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../../api/users';
import UserCard from '../../../components/shared/user-card';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useUserStore } from '../../../../store';
import AddUserModal from './components/add-user-modal/add-user-modal';
import SearchBar from '../../../components/shared/search/search-bar';
import DeleteUserModal from './components/delete-user-modal/delete-user-modal';
import EditUserModal from './components/edit-user-modal/edit-user.modal';
import { AddMultipleModal } from './components/add-multiple-modal/add-multiple-modal';
import { FaUpload } from 'react-icons/all';
import { useTranslation } from 'react-i18next';
import {UserData} from "../../../types/User";

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
  const [filteredUsers, setFilteredUsers] = React.useState<UserData[]>([]);
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
      const results = data.filter((user: UserData) =>
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
    console.log(e)
    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== value));
    }
  };

  const [editUser, setEditUser] = React.useState<UserData>({} as UserData);

  const handleEditClick = (userId: number) => {
    const user = data?.find((user: UserData) => user.id === userId);
    setEditUser(user);
    onEditOpen();
  };

  const { t } = useTranslation();
  const [isLargerThanMedium] = useMediaQuery('(min-width: 768px)');

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

        <Flex display={'flex'} flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'} gap={2}
              w={'100%'}
        >
          <SearchBar w={{ base: '100%', md: '40%' }} onChange={handleChange} searchPlaceholder={t('searchUsers') as string} />

          {
            isLargerThanMedium ?
              <VStack display={'flex'} alignItems={'end'}
                      bgPosition={{ base: 'flex', md: 'fixed' }}
                      right={'10'}

              >
                <Button leftIcon={<DeleteIcon />} colorScheme={'red'}
                        onClick={onDeleteOpen}
                        disabled={checkedItems.length === 0}
                        width={'100%'}
                >
                  <Text>
                    {t('deleteSelected')}
                  </Text>
                </Button>
                <Button width={'100%'} id={'add-user-btn'} leftIcon={<AddIcon />} colorScheme={'whatsapp'}
                        onClick={onOpen}>
                  <Text>
                    {t('addNewUser')}
                  </Text>
                </Button>

                <Button id={'add-multiple-btn'} leftIcon={<FaUpload />} colorScheme={'telegram'}
                        width={'100%'} onClick={onMultipleOpen}>
                  <Text>
                    {t('addMultipleUsers')}
                  </Text>
                </Button>
              </VStack>
              :
              <VStack display={'flex'} alignItems={'end'}
                      position={{ base: 'fixed', md: 'fixed' }}
                      zIndex={'99'}
                      right={'2'}
                      bottom={'10'}
              >
                <IconButton icon={<DeleteIcon />}
                            colorScheme={'red'}
                            onClick={onDeleteOpen}
                            disabled={checkedItems.length === 0}
                            opacity={checkedItems.length === 0 ? 0.9 : 1}
                            width={'100%'}
                            aria-label={'delete selected users'}
                />
                <IconButton aria-label={'add one user'} width={'100%'} id={'add-user-btn'} icon={<AddIcon />}
                            colorScheme={'whatsapp'}
                            onClick={onOpen} />

                <IconButton icon={<FaUpload />} aria-label={'upload file to add multiple users'} id={'add-multiple-btn'}
                            colorScheme={'telegram'}
                            width={'100%'} onClick={onMultipleOpen} />
              </VStack>
          }


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
        <Wrap spacing={8} pt={10} w={'100%'} h={'100%'} align={'center'} justify={'space-around'}>
          {
            filteredUsers.map((user: UserData) => {
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