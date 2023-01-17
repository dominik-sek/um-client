import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, useToast,
} from '@chakra-ui/react';
import { AddDepartmentForm } from './add-department-form';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { createDepartment } from '../../../../api/departments';

export const AddDepartmentModal = (props: { isOpen: boolean, onClose: () => void, refetch: () => void }) => {
  const [formValues, setFormValues] = React.useState({});
  const toast = useToast();
  const { mutate } = useMutation(createDepartment, {
    onSuccess: () => {
      toast({
        title: 'Department added successfully.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      props.refetch();
      props.onClose();
      setFormValues({});
    },
    onError: () => {
      toast({
        title: 'There has been a problem adding the department.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
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
        <ModalHeader>Add department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddDepartmentForm formValues={formValues} setFormValues={setFormValues} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'blue'} mr={3} onClick={handleAdd}>
            Add department
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};