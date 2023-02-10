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
import { AddCourseForm } from './add-course-form';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { createDepartment } from '../../../../api/departments';
import { addCourse } from '../../../../api/courses';
import { useTranslation } from 'react-i18next';

export const AddCourseModal = (props: { isOpen: boolean, onClose: () => void, refetch: () => void }) => {
  const [formValues, setFormValues] = React.useState({});
  const toast = useToast();
  const { mutate } = useMutation(addCourse, {
    onSuccess: () => {
      toast({
        title: t('courseAdded'),
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
        title: t('courseNotAdded'),
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
  const { t } = useTranslation();
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}
           size={{ base: 'md', md: '2xl', lg: '4xl' }}>
      <ModalOverlay />
      <ModalContent position={'relative'}>
        <ModalHeader>{t('addCourse')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddCourseForm formValues={formValues} setFormValues={setFormValues} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'blue'} mr={3} onClick={handleAdd}>
            {t('add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};