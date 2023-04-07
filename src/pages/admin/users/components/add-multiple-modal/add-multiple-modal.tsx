import {
	Button,
	CloseButton,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useToast,
	Wrap,
} from '@chakra-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import { useState } from 'react';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { addNewPerson } from '../../../../../api/users';
import {allowedCSVHeaders} from "../../../../../constants/allowedCsvHeaders";

const fileTypes = ['csv', 'xls', 'xlsx'];

export const AddMultipleModal = (props: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const { t } = useTranslation();

	const [userFile, setUserFile] = useState<unknown[]>([]);
	const [fileName, setFileName] = useState<string>();
	const [uploading, setUploading] = useState(false);
	const toast = useToast();
	const useUploadUsers = useMutation(addNewPerson, {});

	const handleFileUpload = (file: File) => {
		setFileName(file.name);
		Papa.parse(file, {
			header: true,
			step: (row,parser)=>{
				parser.pause();
				// @ts-ignore
				const headers = row.data[0];
				//if headers are undefined or not the same as the allowed headers
				if(!headers || !allowedCSVHeaders.every(header=>headers[header])){
					toast({
						title: t('invalidCSV'),
						status: 'error',
						duration: 4000,
						isClosable: true,
						position: 'top-right',
					});
					setUserFile([]);
					setFileName('');
					parser.abort();
				}
				parser.resume();
			},
			complete: (results) => {
				setUserFile(results.data);
			},
		});
	};

	const closeAndReset = () => {
		setUserFile([]);
		props.onClose();
	};

	const validateAndUpload = () => {
		setUploading(true);
		userFile.forEach((user: any) => {
			useUploadUsers.mutate(
				{ userProfile: user },
				{
					onSuccess: () => {
						toast({
							title: 'Users added successfully.',
							status: 'success',
							duration: 4000,
							isClosable: true,
							position: 'top-right',
						});
						setUploading(false);
						props.onClose();
					},
					onError: () => {
						toast({
							title: 'There has been a problem adding the users.',
							status: 'error',
							duration: 4000,
							isClosable: true,
							position: 'top-right',
						});
						setUploading(false);
						props.onClose();
					},
				},
			);
		});

		setUploading(false);
	};
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{t('addMultipleUsers')}</ModalHeader>
				<ModalCloseButton />
				<ModalBody display={'flex'} justifyContent={'center'}>
					{uploading ? (
						<Spinner size={'xl'} />
					) : (
						<Wrap>
							<FileUploader
								handleChange={handleFileUpload}
								name="file"
								types={fileTypes}
								label={t('fileUpload')}
							/>
							<HStack
								display={'flex'}
								justifyContent={'space-between'}>
								{userFile && (
									<Text>
										{fileName} - {t('found')}{' '}
										{userFile.length} {t('userOrUsers')}
									</Text>
								)}
								{userFile && (
									<CloseButton
										color={'red'}
										onClick={() => setUserFile([])}
									/>
								)}
							</HStack>
						</Wrap>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						disabled={!userFile}
						colorScheme="green"
						mr={3}
						onClick={validateAndUpload}>
						{t('validateAndUpload')}
					</Button>
					<Button colorScheme="red" mr={3} onClick={closeAndReset}>
						{t('close')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
