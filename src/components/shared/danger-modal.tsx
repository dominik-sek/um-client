import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import React from 'react';

function DangerModal(props: { isOpen: boolean, onClose: () => void, handleConfirm: () => void, children: any, heading?: string, dangerText?: string }) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'}
                     alignItems={'center'} gap={'4'}>
          <WarningTwoIcon boxSize={'100px'} color={'orange.300'} />
          <Heading size={'md'}>Are you sure you want to proceed?</Heading>
          <Heading size={'xs'} textAlign={'center'}>{props.dangerText ?? 'This action cannot be undone'}</Heading>
        </ModalHeader>
        <Divider />
        <ModalBody>
          {props.children}
        </ModalBody>

        <Divider />

        <ModalFooter gap={6}>
          <Button colorScheme={'green'} variant={'solid'} onClick={props.handleConfirm}>Yes</Button>
          <Button colorScheme={'red'} variant={'solid'} onClick={props.onClose}>No</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  );
}

export default DangerModal;