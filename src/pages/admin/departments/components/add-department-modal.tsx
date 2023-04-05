import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from '@chakra-ui/react';
import { AddDepartmentForm } from './add-department-form';
import React from 'react';
import { useMutation } from 'react-query';
import { createDepartment } from '../../../../api/departments';
import { useTranslation } from 'react-i18next';

export const AddDepartmentModal = (props: {
	isOpen: boolean;
	onClose: () => void;
	refetch: () => void;
}) => {
	const [formValues, setFormValues] = React.useState({});
	const [isFormValid, setIsFormValid] = React.useState(false);

	const toast = useToast();
	const { t } = useTranslation();
	const { mutate } = useMutation(createDepartment, {
		onSuccess: () => {
			toast({
				title: t('deptAdded'),
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
				title: t('deptNotAdded'),
				status: 'error',
				duration: 4000,
				isClosable: true,
				position: 'top-right',
			});
		},
	});
	const handleAdd = () => {
		isFormValid && mutate(formValues);
	};
	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			size={{ base: 'md', md: '2xl', lg: '4xl' }}>
			<ModalOverlay />
			<ModalContent position={'relative'}>
				<ModalHeader>{t('addDepartment')}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<AddDepartmentForm
						formValues={formValues}
						setFormValues={setFormValues}
						setIsFormValid={setIsFormValid}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme={'blue'}
						mr={3}
						onClick={handleAdd}
						width={'20%'}
						disabled={!isFormValid}>
						{t('add')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
