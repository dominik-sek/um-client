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
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { account, address, contact, course, faculty, person, personal } from '@prisma/client';
import { useMutation } from 'react-query';
import { Address, Contact, Personal } from './tab-panels';
import { updateUserProfile } from '../../../../../api/users';
import Message from '../../../../../components/shared/message';

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
  //remove all id fields
  const [editedPerson, setEditedPerson] = React.useState<personCoalesced>(user);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  console.log(editedPerson);
  const { mutate, isLoading, error } = useMutation(updateUserProfile, {
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        props.refetch();
        props.onClose();

      }, 1500);
    },
    onError: () => {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        props.onClose();
      }, 1500);
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
        <Message
          variant={'success'}
          show={showSuccess}
          message={'Successfully edited user profile'}
        />
        <Message
          variant={'error'}
          show={showError}
          message={'An error occurred while editing user profile'}
        />

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
