import { Heading, Text, useToast, Wrap } from '@chakra-ui/react';
import React from 'react';
import { person } from '@prisma/client';
import { useMutation } from 'react-query';
import DangerModal from '../../../../../components/shared/danger-modal';
import { removePerson } from '../../../../../api/users';
import { useTranslation } from 'react-i18next';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  usersChecked: string[];
  users: person[];
  refetch: () => void;
}

const DeleteUserModal = (props: UserModalProps) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { mutate, isLoading, error } = useMutation(removePerson, {
    onSuccess: () => {
      toast({
        title: t('userDeleted'),
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      props.onClose();
      props.refetch();
    },

    onError: () => {
      toast({
        title: t('userNotDeleted'),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      props.onClose();
    },
  });

  const handleClose = () => {
    toast({
      title: t('cannotLetYouDoThat'),
      status: 'info',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
    props.onClose();
    //
    // props.usersChecked.forEach((id) => {
    //   // mutate({ userId: Number(id) });
    // });
  };
  return (
    <DangerModal isOpen={props.isOpen}
                 onClose={props.onClose}
                 handleConfirm={handleClose}
                 dangerText={t('deleteUserModalText')}
                 footerText={<Heading size={'sm'} textAlign={'center'}>
                 </Heading>
                 }>

      <Wrap display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        {
          props.usersChecked.map((id) => {
            const user = props.users.find((user) => user.id.toString() === id);
            return (
              <li key={id}>
                <Text fontSize={'xl'} p={2} key={id}>{user?.first_name} {user?.last_name}</Text>
              </li>
            );
          })
        }
      </Wrap>

    </DangerModal>
  );

};
export default DeleteUserModal;
