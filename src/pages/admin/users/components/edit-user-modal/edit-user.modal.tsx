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
  Tabs, Text, useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation } from 'react-query';
import { Address, Contact, Personal } from './tab-panels';
import { updateUserProfile } from '../../../../../api/users';
import { useTranslation } from 'react-i18next';
import {UserData} from "../../../../../types/User";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  refetch: () => void;
}

const EditUserModal = (props: UserModalProps) => {
  const { user } = props;
  const { address, contact } = props.user;
  const toast = useToast();
  const [editedPerson, setEditedPerson] = React.useState<UserData>(user);
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(updateUserProfile, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('userUpdated'),
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
        title: t('error'),
        description: t('userNotUpdated'),
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
        <ModalHeader>
          <Text>{user.first_name} {user.last_name}</Text>
          <Text>{user.account?.username}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <Tabs isFitted>
          <TabList>
            <Tab>{t('personal')}</Tab>
            <Tab>{t('address')}</Tab>
            <Tab>{t('contact')}</Tab>
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
            {t('cancel')}
          </Button>
          <Button onClick={handleClose} isLoading={isLoading} colorScheme={'green'}>{t('confirmChanges')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
export default EditUserModal;
