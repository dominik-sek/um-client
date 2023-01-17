import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue, useToast,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddAddressStep, AddBasicStep, CheckAndFinishStep } from './steps';
import { useMutation } from 'react-query';
import { addNewPerson } from '../../../../../api/users';
import Message from '../../../../../components/shared/message';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AddUserModal = (props: UserModalProps) => {
  const { t, i18n } = useTranslation();
  const [formValues, setFormValues] = useState({});
  const [allowNext, setAllowNext] = useState(false);
  const steps = [
    { label: 'Add basic information', content: AddBasicStep },
    { label: 'Add Address & contact info', content: AddAddressStep },
    { label: 'check and finish', content: CheckAndFinishStep },
  ];
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { mutate: addPerson, isLoading: isAddingPerson, error: addingError } = useMutation(addNewPerson, {
    onSuccess: () => {
      toast({
        title: 'User added successfully.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
      props.refetch();
      props.onClose();
      reset();
    },
    onError: () => {
      toast({
        title: 'There has been a problem adding the user.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
      props.onClose();
    },
  });

  const handleClose = () => {
    setFormValues({});
    props.onClose();
    reset();
    setAllowNext(false);
  };
  const closeAndReset = () => {
    console.log(formValues);
    addPerson({ userProfile: formValues });
  };
  const toast = useToast();

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose} size={{ base: 'md', md: '2xl', lg: '4xl' }}>
      <ModalOverlay />
      <ModalContent position={'relative'}>
        <ModalHeader p={8} display={'flex'} flexDir={'column'} gap={4}>
          <Steps activeStep={activeStep} trackColor={useColorModeValue('', 'gray.200')}>
            {steps.map((step, index) => (
              <Step key={index}>
                {step.label}
              </Step>
            ))}
          </Steps>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          {React.createElement(steps[activeStep].content, { setFormValues, formValues, setAllowNext })}
        </ModalBody>
        <ModalFooter>

          <Button colorScheme='blue' mr={3} onClick={prevStep} isDisabled={activeStep === 0}>
            Previous
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button colorScheme='green' isLoading={isAddingPerson} onClick={closeAndReset}>
              Finish
            </Button>
          ) : (
            <Button colorScheme='green' isDisabled={!allowNext} onClick={nextStep}>
              Next
            </Button>
          )
          }
        </ModalFooter>
      </ModalContent>

    </Modal>
  );

};
export default AddUserModal;
