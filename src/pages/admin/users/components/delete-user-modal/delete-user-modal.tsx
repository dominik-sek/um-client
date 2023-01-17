import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { person } from '@prisma/client';
import { useMutation } from 'react-query';
import DangerModal from '../../../../../components/shared/danger-modal';
import { removePerson } from '../../../../../api/users';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  usersChecked: string[];
  users: person[];
  refetch: () => void;
}

const DeleteUserModal = (props: UserModalProps) => {

  const { mutate, isLoading, error } = useMutation(removePerson, {
    onSuccess: () => {
      props.onClose();
      props.refetch();
    },
    onError: () => {
      console.log('error', error);
    },
  });

  const handleClose = () => {
    props.usersChecked.forEach((id) => {
      mutate({ userId: Number(id) });
    });
  };
  return (
    <DangerModal isOpen={props.isOpen} onClose={props.onClose} handleConfirm={handleClose}
                 dangerText={'Deleting a user will also delete all of their data, including grades, courses, and assignments.'}
                 footerText={<Heading size={'sm'} textAlign={'center'}>Are you sure you want to delete the following
                   users?</Heading>
                 }>
      <ul>
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
      </ul>

    </DangerModal>
  );

};
export default DeleteUserModal;
