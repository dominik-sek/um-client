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
import { addCourseSchema as schema } from '../../../../../forms/yup-schemas';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import onFormValueChange from '../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../../../api/users';
import { person } from '@prisma/client';
import { getAllDepartments } from '../../../../api/departments';
import { useTranslation } from 'react-i18next';

export const AddCourseForm = (props: {
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

	const [teachers, setTeachers] = useState([]);

	const { data: departments } = useQuery(
		'getAllDepartments',
		getAllDepartments,
		{
			refetchOnWindowFocus: false,
		},
	);

	const { data: users } = useQuery('fetchAllUsers', fetchAllUsers, {
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (users) {
			setTeachers(
				users.filter(
					(user: { role: string }) =>
						user.role === 'teacher' || user.role === 'admin',
				),
			);
		}
	}, [users]);

	const { t } = useTranslation();

	useEffect(() => {
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

				<FormControl isRequired isInvalid={!!errors?.type?.message}>
					<FormErrorMessage>
						{t('courseTypeRequired')}
					</FormErrorMessage>
					<FormLabel>{t('courseType')}</FormLabel>
					<Select
						{...register('type', {
							onChange: (e) => handleFormValuesChange(e, 'type'),
						})}>
						<option value="laboratory">{t('courseLab')}</option>
						<option value="lecture">{t('courseLecture')}</option>
						<option value="exercise">{t('courseExercise')}</option>
					</Select>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors?.ects?.message}>
					<FormErrorMessage>{t('ectsCredits')}</FormErrorMessage>
					<FormLabel>{t('courseCredits')}</FormLabel>
					<Input
						{...register('ects', {
							onChange: (e) => handleFormValuesChange(e, 'ects'),
						})}
					/>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors?.semester?.message}>
					<FormErrorMessage>{t('semesterRequired')}</FormErrorMessage>
					<FormLabel>{t('semester')}</FormLabel>
					<Input
						{...register('semester', {
							onChange: (e) =>
								handleFormValuesChange(e, 'semester'),
						})}
					/>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors?.person?.message}>
					<FormErrorMessage>{t('teacherRequired')}</FormErrorMessage>
					<FormLabel>{t('courseTeacher')}</FormLabel>
					<Select
						{...register('person', {
							onChange: (e) =>
								handleFormValuesChange(e, 'person_id'),
						})}>
						<option value={''}>{t('courseTeacher')}</option>
						{teachers.map((teacher: person) => (
							<option key={teacher.id} value={teacher.id}>
								{teacher.first_name} {teacher.last_name}
							</option>
						))}
					</Select>
				</FormControl>

				<FormControl
					isRequired
					isInvalid={!!errors?.department?.message}>
					<FormErrorMessage>
						{t('departmentRequired')}
					</FormErrorMessage>
					<FormLabel>{t('deptName')}</FormLabel>
					<Select
						{...register('department', {
							onChange: (e) =>
								handleFormValuesChange(e, 'department_id'),
						})}>
						<option value="">{t('selectDept')}</option>
						{departments?.map(
							(department: { id: number; name: string }) => (
								<option
									key={department.id}
									value={department.id}>
									{department.name}
								</option>
							),
						)}
					</Select>
				</FormControl>
			</Flex>
		</form>
	);
};
