import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
} from '@chakra-ui/react';
import { AddCourseForm } from './add-course-form';
import React from 'react';
import { useMutation } from 'react-query';
import { addCourse } from '../../../../api/courses';
import { useTranslation } from 'react-i18next';

export const AddCourseModal = (props: {
	isOpen: boolean;
	onClose: () => void;
	refetch: () => void;
}) => {
	const [formValues, setFormValues] = React.useState({});
	const [isFormValid, setIsFormValid] = React.useState(false);

	const toast = useToast();
	const { mutate, isLoading } = useMutation(addCourse, {
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
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			size={{ base: 'md', md: '2xl', lg: '4xl' }}>
			<ModalOverlay />
			<ModalContent position={'relative'}>
				<ModalHeader display={'flex'} flexDir={'column'}>
					{t('addCourse')}
					<Text fontSize={'sm'}>{t('addCourseNotice')}*</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<AddCourseForm
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
						isLoading={isLoading}
						disabled={!isFormValid}>
						{t('add')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
