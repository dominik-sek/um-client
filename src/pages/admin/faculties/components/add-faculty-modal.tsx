import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AddFacultyForm } from './add-faculty-form';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { createFaculty } from '../../../../api/faculties';

export const AddFacultyModal = (props: { isOpen: boolean, onClose: () => void, refetch: () => void }) => {
  const [formValues, setFormValues] = React.useState({});

  const { mutate } = useMutation(createFaculty, {
    onSuccess: () => {
      props.refetch();
      props.onClose();
      setFormValues({});
    },
  });

  const handleAdd = () => {
    mutate(formValues);
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}
           size={{ base: 'md', md: '2xl', lg: '4xl' }}>
      <ModalOverlay />
      <ModalContent position={'relative'}>
        <ModalHeader>Add Faculty</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddFacultyForm formValues={formValues} setFormValues={setFormValues} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'blue'} mr={3} onClick={handleAdd}>
            Add faculty
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};