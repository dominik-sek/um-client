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
import { AddCourseForm } from './add-course-form';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { createDepartment } from '../../../../api/departments';
import { addCourse } from '../../../../api/courses';

export const AddCourseModal = (props: { isOpen: boolean, onClose: () => void, refetch: () => void }) => {
  const [formValues, setFormValues] = React.useState({});

  const { mutate } = useMutation(addCourse, {
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
        <ModalHeader>Add course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddCourseForm formValues={formValues} setFormValues={setFormValues} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'blue'} mr={3} onClick={handleAdd}>
            Add course
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};