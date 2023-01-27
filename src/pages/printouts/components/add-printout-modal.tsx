import {
  Button, CloseButton, HStack, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Spinner, Text, useToast, Wrap,
} from '@chakra-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import { Dispatch, SetStateAction, useState } from 'react';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { cloudinaryUpload } from '../../../api/cloudinary-upload';
import { addOnePrintout } from '../../../api/printouts';

const fileTypes = ['pdf', 'docx', 'doc', 'odt'];

export const AddPrintoutModal = (props: { isOpen: boolean, onClose: () => void, refetch: () => {} }) => {

  const { t } = useTranslation();
  const [userFile, setUserFile] = useState<any>();
  const [fileName, setFileName] = useState<any>();
  const [fileDescription, setFileDescription] = useState<any>();
  const [uploading, setUploading] = useState(false);

  const { mutate: addPrintout } = useMutation(addOnePrintout);

  const toast = useToast();
  const handleFileUpload = (file: any) => {
    setFileName(file.name);
    setUserFile(file);
  };
  const closeAndReset = () => {
    props.refetch();
    props.onClose();
    setUserFile(undefined);
  };
  const validateAndUpload = () => {
    setUploading(true);

    cloudinaryUpload(userFile, import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_DOCS)
      .then((res) => {
        console.log(res);
        const { secure_url } = res;
        addPrintout({ url: secure_url, description: fileDescription }, {
          onSuccess: () => {
            toast({
              title: t('printouts.added'),
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setUploading(false);
            closeAndReset();
          },
        });
      });

  };
  console.log(fileDescription);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Printouts</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} justifyContent={'center'}>
          {
            uploading ? (
              <Spinner size={'xl'} />
            ) : (
              <Wrap>
                <Input placeholder={'Printout description/name'} onChange={e => setFileDescription(e.target.value)} />
                <FileUploader handleChange={handleFileUpload} name='file' types={fileTypes}
                              label={t('printoutUpload')} />
                {userFile && <CloseButton color={'red'} onClick={() => setUserFile(undefined)} />}

              </Wrap>
            )
          }
        </ModalBody>
        <ModalFooter>
          <Button disabled={!userFile} colorScheme='green' mr={3} onClick={validateAndUpload}>
            Upload
          </Button>
          <Button colorScheme='red' mr={3} onClick={closeAndReset}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
