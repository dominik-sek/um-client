import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs, useToast,
} from '@chakra-ui/react';
import React from 'react';
import { account, address, contact, course, faculty, person, personal } from '@prisma/client';
import { useMutation } from 'react-query';
import { Address, Contact, Personal } from './tab-panels';
import { updateUserProfile } from '../../../../../api/users';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: personCoalesced;
  refetch: () => void;
}

type personCoalesced = person & {
  account: account;
  address: address;
  contact: contact;
  course: course;
  faculty: faculty;
  personal: personal;
}

const EditUserModal = (props: UserModalProps) => {
  const { user } = props;
  const { account, address, contact, course, faculty, personal } = props.user;
  const toast = useToast();
  const [editedPerson, setEditedPerson] = React.useState<personCoalesced>(user);
  const { mutate, isLoading, error } = useMutation(updateUserProfile, {
    onSuccess: () => {
      toast({
        title: 'User updated.',
        description: 'We\'ve updated the user\'s profile.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      props.refetch();
      props.onClose();
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'We\'ve encountered an error while updating the user\'s profile.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      props.onClose();

    },
  });

  const handleClose = () => {
    mutate({ userProfile: editedPerson, userId: user.id });
  };
  return (

    <Modal isOpen={props.isOpen} onClose={props.onClose}
           size={{ base: 'md', md: '2xl', lg: '4xl' }}>

      <ModalOverlay />
      <ModalContent position={'relative'}>
        <ModalHeader>{user.first_name} {user.last_name}</ModalHeader>
        <ModalCloseButton />
        <Tabs isFitted>
          <TabList>
            <Tab>Personal</Tab>
            <Tab>Address</Tab>
            <Tab>Contact</Tab>
          </TabList>
          <ModalBody>
            <TabPanels>
              <TabPanel>
                <Personal formValues={user} setFormValues={setEditedPerson} />
              </TabPanel>
              <TabPanel>
                <Address formValues={address} setFormValues={setEditedPerson} />
              </TabPanel>
              <TabPanel>
                <Contact formValues={contact} setFormValues={setEditedPerson} />
              </TabPanel>

            </TabPanels>
          </ModalBody>
        </Tabs>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={props.onClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} isLoading={isLoading} colorScheme={'green'}>Confirm changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
export default EditUserModal;
