import {
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { addDepartmentSchema as schema } from '../../../../../forms/yup-schemas';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import onFormValueChange from '../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { getAllFaculties } from '../../../../api/faculties';
import { useTranslation } from 'react-i18next';

export const AddDepartmentForm = (props: {
	formValues: any;
	setFormValues: Dispatch<SetStateAction<any>>;
	setIsFormValid: Dispatch<SetStateAction<boolean>>;
}) => {
	const { setFormValues, formValues } = props;
	const {
		register,
		formState: { errors, isValid },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema),
		defaultValues: formValues,
	});

	const handleFormValuesChange = useCallback(
		(
			event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
			fieldName: string,
			propertyName?: string,
		) => {
			onFormValueChange(
				event,
				fieldName,
				formValues,
				setFormValues,
				propertyName,
			);
		},
		[formValues, setFormValues],
	);

	const { data: faculties } = useQuery('getAllFaculties', getAllFaculties, {
		refetchOnWindowFocus: false,
	});

	const { t } = useTranslation();

	useEffect(() => {
		console.log(errors);
		props.setIsFormValid(isValid);
	}, [isValid, props]);

	return (
		<form>
			<Flex flexDir={'column'}>
				<FormControl isRequired isInvalid={!!errors?.name?.message}>
					<FormErrorMessage>{t('nameRequired')}</FormErrorMessage>
					<FormLabel>{t('name')}</FormLabel>
					<Input
						{...register('name', {
							onChange: (e) => handleFormValuesChange(e, 'name'),
						})}
					/>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors?.length?.message}>
					<FormErrorMessage>
						{t('lengthOfStudiesRequired')}
					</FormErrorMessage>
					<FormLabel>{t('lengthOfStudies')}</FormLabel>
					<Input
						{...register('length', {
							onChange: (e) =>
								handleFormValuesChange(e, 'length'),
						})}
					/>
				</FormControl>

				<FormControl
					isRequired
					isInvalid={!!errors?.study_type?.message}>
					<FormErrorMessage>
						{t('studyTypeRequired')}
					</FormErrorMessage>
					<FormLabel>{t('studyType')}</FormLabel>
					<Select
						{...register('study_type', {
							onChange: (e) =>
								handleFormValuesChange(e, 'study_type'),
						})}>
						<option value={''}>{t('selectStudyType')}</option>
						<option value="full-time">{t('fullTime')}</option>
						<option value="part-time">{t('partTime')}</option>
					</Select>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors?.degree?.message}>
					<FormErrorMessage>{t('degreeRequired')}</FormErrorMessage>
					<FormLabel>{t('degree')}</FormLabel>
					<Input
						{...register('degree', {
							onChange: (e) =>
								handleFormValuesChange(e, 'degree'),
						})}
					/>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors?.faculty?.message}>
					<FormErrorMessage>{t('facultyRequired')}</FormErrorMessage>
					<FormLabel>{t('facultyName')}</FormLabel>
					<Select
						{...register('faculty', {
							onChange: (e) =>
								handleFormValuesChange(e, 'faculty_id'),
						})}>
						<option value={''}>{t('selectFaculty')}</option>
						{faculties?.map((faculty: any) => {
							return (
								<option key={faculty.id} value={faculty.id}>
									{faculty.name}
								</option>
							);
						})}
					</Select>
				</FormControl>
			</Flex>
		</form>
	);
};
