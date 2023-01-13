import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useModal,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useUserStore } from '../../../store';
import { ArrowForwardIcon, CloseIcon, EditIcon, InfoIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import React, { useEffect } from 'react';
import { changeUserAvatar } from '../../api/change-user-avatar';
import { useQuery } from 'react-query';
import { fetchUserProfile } from '../../api/fetch-user-profile';
import { FiDelete, FiSave } from 'react-icons/all';
import { Form } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gradebook } from '@prisma/client';
import { UserRole } from '../../enums/user-role';
import { Simulate } from 'react-dom/test-utils';
import change = Simulate.change;
import { updateUserProfile } from '../../api/update-user-profile';

let addressKeyMap = {
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
let contactKeyMap = {
  en: {
    email: 'Email',
    phone_number: 'Phone Number',
  },
  pl: {
    email: 'Email',
    phone_number: 'Numer telefonu',
  },
};
let personalKeyMap = {
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
  const handleConfirm = () => {
    onClose();
    setEditBasicInfo(false);
    setHasChanged(false);
    updateUserProfile(changedUser, user.id)
      .then(() => {
        fetchUserProfile()
          .then((user) => {
            setUser(user);
          });
        setChangedUser({});

      });
  };
  const handleDiscard = () => {
    onClose();
    // reset form
    formRef.current.reset();
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
            refetchProfile()
              .then((res) => {
                setUser(res.data);
              });

          });
      });
  };

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
                    <EditIcon cursor={'pointer'} boxSize={6} />
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
                  <Heading size={'md'}>Personal</Heading>
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
                            key={key}
                            //@ts-ignore
                            value={value}
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


          {
            user.role === UserRole.TEACHER && (
              <Card w={'100%'}
                    bg={useColorModeValue('white', 'gray.800')}
              >
                <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
                  <Heading size={'md'}>Your courses</Heading>
                  <IconButton aria-label={'Go to course overview'} icon={<ArrowForwardIcon />} />
                </CardHeader>
                <CardBody
                  display={'flex'}
                  justifyContent={'center'}
                  gap={4}>
                  <FormControl>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Course name</Th>
                          <Th>Course type</Th>
                          <Th>Semester</Th>
                        </Tr>
                      </Thead>
                      {
                        user.course.map((course) => {
                          return (
                            <Tr key={course.id}>
                              <Td>{course.name}</Td>
                              <Td>{course.type}</Td>
                              <Td>{course.semester}</Td>
                            </Tr>
                          );
                        })
                      }

                    </Table>
                  </FormControl>
                </CardBody>
              </Card>
            )
          }

          <Card w={'100%'}
                bg={useColorModeValue('white', 'gray.800')}>
            <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
              <VStack display={'flex'} w={'100%'} flexDir={'column'}>
                <Box display={'flex'} w={'100%'} justifyContent={'space-between'}>
                  <Heading size={'md'}>Basic Information</Heading>
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
                    <Heading as={'h5'} size={'md'}>Address</Heading>
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
                            <Input variant={'outlined'} key={key} defaultValue={value} onChange={(e) => {

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
                    <Heading as={'h5'} size={'md'}>Contact</Heading>

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
                      disabled={!hasChanged} onClick={onOpen}>Save</Button>
              <Button leftIcon={<FiDelete />} minW={'25%'} colorScheme={'red'} onClick={handleDiscard}>Discard</Button>
            </ButtonGroup>
          </Card>

        </Wrap>
      </Stack>

    </Flex>
  );
};
export default Profile;