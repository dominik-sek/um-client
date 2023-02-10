import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure, useToast,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useUserStore } from '../../store';
import { EditIcon, WarningTwoIcon } from '@chakra-ui/icons';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { FiDelete, FiSave } from 'react-icons/all';
import { useTranslation } from 'react-i18next';
import { changeUserAvatar } from '../api/users';
import { fetchUserProfile } from '../api/users';
import { updateUserProfile } from '../api/users';

const addressKeyMap = {
  en: {
    city: 'City',
    state: 'State',
    country: 'Country',
    street: 'Street',
    postal_code: 'Postal Code',
  },
  pl: {
    city: 'Miasto',
    state: 'Województwo',
    country: 'Kraj',
    street: 'Ulica',
    postal_code: 'Kod pocztowy',
  },
};
const contactKeyMap = {
  en: {
    email: 'Email',
    phone_number: 'Phone Number',
  },
  pl: {
    email: 'Email',
    phone_number: 'Numer telefonu',
  },
};
const personalKeyMap = {
  en: {
    first_name: 'First Name',
    last_name: 'Last Name',
    birth_date: 'Birth Date',
    title: 'Scientific Title',
    pesel: 'PESEL',
    gender: 'Gender',
  },
  pl: {
    first_name: 'Imię',
    last_name: 'Nazwisko',
    birth_date: 'Data urodzenia',
    title: 'Tytuł naukowy',
    pesel: 'PESEL',
    gender: 'Płeć',
  },
};
const userStatus = {
  en: {
    married: 'Married',
    disabled: 'Disabled',
  },
  pl: {
    married: 'Stan cywilny - małżeństwo',
    disabled: 'Niepełnosprawny',
  },
};
const Profile = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const [editBasicInfo, setEditBasicInfo] = React.useState(false);
  const [hasChanged, setHasChanged] = React.useState(false);
  const [changedUser, setChangedUser] = React.useState({});
  const { t, i18n } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { refetch: refetchProfile } = useQuery('userProfile', fetchUserProfile, {
    enabled: false,
  });
  const toast = useToast();
  const { mutate } = useMutation(updateUserProfile, {
    onSuccess: (data) => {
      refetchProfile().then(
        (res) => {
          toast({
            title: 'Profile updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setUser(res.data);
          setEditBasicInfo(false);
          setChangedUser({});
        },
      );
    },
    onError: (error) => {
      toast({
        title: 'Profile update failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleConfirm = () => {
    onClose();
    setEditBasicInfo(false);
    setHasChanged(false);
    mutate({ userProfile: changedUser, userId: user.id });
  };
  const handleDiscard = () => {
    onClose();
    formRef.current!.reset();
    setEditBasicInfo(false);
    setHasChanged(false);
    setChangedUser(user);
  };
  const handleUserInformationChange = (key: string, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanged(true);
    if (field === 'address') {
      setChangedUser({
        [field]: {
          [key]: e.target.value,
        },
      });
    }
    if (field === 'contact') {
      setChangedUser({
        [field]: {
          [key]: e.target.value,
        },
      });
    }
  };

  const userRole: any = {
    'admin': 'Admin',
    'student': 'Student',
    'teacher': 'Teacher',
  };
  let hasAvatar = false;
  let hasBackgroundPicture = false;

  if (user.account.account_images) {
    hasAvatar = user.account.account_images.avatar_url !== null;
    hasBackgroundPicture = user.account.account_images.background_url !== '';
  }

  const [avatarLink, setAvatarLink] = React.useState<string>(user.account.account_images?.avatar_url || '');
  const handleAvatarChange = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        changeUserAvatar(data.secure_url)
          .then((res) => {
            setAvatarLink(data.secure_url);
            fetchUserProfile()
              .then((updatedUser) => {
                  console.log(updatedUser);
                  setUser({ ...updatedUser });
                },
              );
          });
      });
  };
  const bgInput = useColorModeValue('gray.200', 'gray.700');
  return (

    <Flex
      w={'100%'}
      h={'100%'}
      direction={'column'}
    >
      <Stack spacing={8} flexDir={'column'} py={6} justify={'center'} align={'center'}>
        <Box
          maxW={'80%'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          rounded={'md'}
          overflow={'hidden'}>
          {hasBackgroundPicture ? (
            <Image
              h={'120px'}
              w={'full'}
              src={user.account.account_images.background_url}
              objectFit={'cover'}
            />
          ) : (
            <Stack
              h={'120px'}
              w={'full'}
            >

            </Stack>
          )}
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                hasAvatar ? avatarLink : ''
              }
            >
              <AvatarBadge
                boxSize={'1em'}
                bg={'transparent'}
                borderColor={'transparent'}
                cursor={'pointer'}

              >
                <FormControl>
                  <label htmlFor='avatar-upload'>
                    <EditIcon cursor={'pointer'} boxSize={6} color={useColorModeValue('black', 'white')} />
                  </label>
                  <input id={'avatar-upload'}
                         accept='image/*'
                         type={'file'}
                         style={{ display: 'none' }}
                         onChange={(e) => {
                           if (e.target.files) {
                             handleAvatarChange(e.target.files[0]);
                           }
                         }
                         }
                  />
                </FormControl>
              </AvatarBadge>

            </Avatar>
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Text fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                {user.first_name + ' ' + user.last_name}
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                {userRole[user.role]}
              </Text>
            </Stack>

          </Box>
        </Box>

        <Wrap
          maxW={'80%'}
          w={'full'}
          overflow={'hidden'}
          justify={'space-between'}
          spacing={8}
        >

          <Card
            bg={useColorModeValue('white', 'gray.800')}
            flex={1}>
            <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
              <VStack display={'flex'} w={'100%'} flexDir={'column'}>
                <Box display={'flex'} w={'100%'} justifyContent={'space-between'}>
                  <Heading size={'md'}>{t('personalInfo')}</Heading>
                </Box>
                <Divider />
              </VStack>
            </CardHeader>
            <CardBody>
              <FormControl>
                <InputGroup
                  display={'flex'}
                  flexDir={'column'}
                  gap={4}
                >
                  {
                    Object.entries(user).map(([key, value]) => {
                      // @ts-ignore
                      if (key.includes('id') || key === 'role' || typeof user[key] === 'object') {
                        return;
                      }

                      return (
                        <Box key={`user-${key}`}>
                          <FormLabel>{
                            //@ts-ignore
                            personalKeyMap[i18n.language][key]}:</FormLabel>
                          <Input
                            variant={'outlined'}
                            bg={bgInput}
                            key={key}
                            //@ts-ignore
                            value={key === 'birth_date' ? new Date(value).toLocaleDateString() : value}
                            isDisabled={!editBasicInfo} />
                        </Box>
                      );
                    })
                  }
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup
                  display={'flex'}
                  flexDir={'column'}
                  gap={4}
                  pt={2}
                >
                  {
                    Object.entries(user.personal).map(([key, value]) => {
                      //@ts-ignore
                      if (key.includes('id') || key === 'role' || typeof user[key] === 'object') {
                        return;
                      }
                      return (
                        <Box key={`personal-${key}`} display={'flex'} justifyContent={'space-between'}>
                          <FormLabel>{
                            //@ts-ignore
                            userStatus[i18n.language][key]}:</FormLabel>
                          <Checkbox isChecked={!value} isDisabled={true} />
                        </Box>
                      );
                    })
                  }
                </InputGroup>
              </FormControl>
            </CardBody>
          </Card>


          <Card
            bg={useColorModeValue('white', 'gray.800')}>
            <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
              <VStack display={'flex'} w={'100%'} flexDir={'column'}>
                <Box display={'flex'} w={'100%'} justifyContent={'space-between'}>
                  <Heading size={'md'}>{t('addressAndContact')}</Heading>
                  <EditIcon cursor={'pointer'} boxSize={6} onClick={() => setEditBasicInfo(!editBasicInfo)} />
                </Box>
                <Divider />
              </VStack>
            </CardHeader>
            <form ref={formRef}>
              <FormControl>

                <CardBody
                  display={'flex'}
                  justifyContent={'center'}
                  gap={4}>

                  <InputGroup
                    display={'flex'}
                    flexDir={'column'}
                    gap={4}
                  >
                    <Heading as={'h5'} size={'md'}>{t('address')}</Heading>
                    <Divider />
                    {
                      Object.entries(user.address).map(([key, value]) => {
                        if (key.includes('id')) {
                          return;
                        }

                        return (
                          <Box key={`address-${key}`}>
                            <FormLabel>{
                              //@ts-ignore
                              addressKeyMap[i18n.language][key]}:</FormLabel>
                            <Input bg={useColorModeValue('gray.200', 'gray.700')} variant={'outlined'} key={key}
                                   defaultValue={value} onChange={(e) => {

                              handleUserInformationChange(key, 'address', e);

                            }}
                                   isDisabled={!editBasicInfo} />
                          </Box>
                        );
                      })
                    }
                  </InputGroup>

                  <Divider orientation={'vertical'} />

                  <InputGroup
                    display={'flex'}
                    flexDir={'column'}
                    gap={4}
                  >
                    <Heading as={'h5'} size={'md'}>{t('contact')}</Heading>
                    <Divider />

                    {
                      Object.entries(user.contact).map(([key, value]) => {
                        if (key.includes('id')) {
                          return;
                        }
                        return (
                          <Box key={`contact-${key}`}>
                            <FormLabel>{
                              //@ts-ignore
                              contactKeyMap[i18n.language][key]}:</FormLabel>
                            <Input variant={'outlined'}
                                   onChange={(e) => handleUserInformationChange(key, 'contact', e)}
                                   key={key}
                                   bg={useColorModeValue('gray.200', 'gray.700')}
                              //@ts-ignore
                                   defaultValue={value}
                                   isDisabled={!editBasicInfo} />
                          </Box>
                        );
                      })
                    }
                  </InputGroup>
                </CardBody>
              </FormControl>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'}
                             alignItems={'center'} gap={'4'}>
                  <WarningTwoIcon boxSize={'100px'} color={'orange.300'} />
                  <Heading size={'md'}>Are you sure you want to proceed?</Heading>
                  <Heading size={'sm'}>This action cannot be undone</Heading>
                  <ModalFooter gap={6}>
                    <Button colorScheme={'green'} variant={'solid'} onClick={handleConfirm}>Yes</Button>
                    <Button colorScheme={'red'} variant={'solid'} onClick={handleDiscard}>No</Button>
                  </ModalFooter>
                </ModalHeader>
                <Divider />
              </ModalContent>
            </Modal>
            <ButtonGroup
              display={'flex'}
              justifyContent={'flex-end'}
              w={'100%'}
              p={4}
            >
              <Button leftIcon={<FiSave />} minW={'25%'} colorScheme={'blue'}
                      disabled={!hasChanged} onClick={onOpen}>{t('save')}</Button>
              <Button leftIcon={<FiDelete />} minW={'25%'} colorScheme={'red'}
                      onClick={handleDiscard}>{t('discard')}</Button>
            </ButtonGroup>
          </Card>

        </Wrap>
      </Stack>

    </Flex>
  );
};
export default Profile;