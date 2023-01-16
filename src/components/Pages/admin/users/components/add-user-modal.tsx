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
} from '@chakra-ui/react';
import { useSteps } from 'chakra-ui-steps';

const steps = [
  { label: 'Add basic information' },
  { label: 'Add Address & contact info' },
  { label: 'all other info' },
  { label: 'check and finish' },
];

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = (props: UserModalProps) => {

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const closeAndReset = () => {
    return props.onClose(), reset();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
      >
        <ModalCloseButton />
        <ModalHeader>
          {steps[activeStep].label} {activeStep + 1} / {steps.length}
        </ModalHeader>
        <Divider />
        <ModalHeader>Add new user</ModalHeader>

        <ModalBody>

        </ModalBody>

        <ModalFooter>

          <Button colorScheme='blue' mr={3} onClick={prevStep} isDisabled={activeStep === 0}>
            Previous
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button colorScheme='green' onClick={closeAndReset}>
              Finish
            </Button>
          ) : (
            <Button colorScheme='green' onClick={nextStep}>
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
