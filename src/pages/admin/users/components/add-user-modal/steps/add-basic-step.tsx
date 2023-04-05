import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalSchema as schema } from '../../../../../../../forms/yup-schemas';
import onFormValueChange from '../../../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { getAllDepartments } from '../../../../../../api/departments';
import { useTranslation } from 'react-i18next';

export const AddBasicStep = (props: {
	setFormValues: (updatedFormValues: any) => void;
	formValues: any;
	setAllowNext: (b: boolean) => void;
}) => {
	const { setFormValues, formValues, setAllowNext } = props;
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		control,
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

	useEffect(() => {
		setAllowNext(isValid);
	}, [isValid]);
	const { data: departments, isLoading: departmentsLoading } = useQuery(
		'getAllDepartments',
		getAllDepartments,
		{
			refetchOnWindowFocus: false,
		},
	);

	return (
		<form style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
			<FormControl
				isInvalid={false}
				display={'flex'}
				justifyContent={'center'}>
				<FormErrorMessage>{t('fillRequired')}</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.first_name?.message}>
				<FormLabel>{t('firstName')}</FormLabel>
				<Input
					{...register('first_name')}
					defaultValue={formValues.first_name}
					onChange={(e) => handleFormValuesChange(e, 'first_name')}
					required
					placeholder={t('firstName') as string}
					type={'text'}
				/>
				<FormErrorMessage>
					{errors?.first_name?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.last_name?.message}>
				<FormLabel>{t('lastName')} </FormLabel>
				<Input
					{...register('last_name')}
					defaultValue={formValues.last_name}
					onChange={(e) => handleFormValuesChange(e, 'last_name')}
					placeholder={t('lastName') as string}
					type={'text'}
				/>
				<FormErrorMessage>
					{errors?.last_name?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={!!errors?.date_of_birth?.message}>
				<FormLabel>{t('dateOfBirth')}</FormLabel>
				<Input
					{...register('date_of_birth')}
					defaultValue={formValues.birth_date}
					onChange={(e) => handleFormValuesChange(e, 'birth_date')}
					type={'date'}
				/>
				<FormErrorMessage>
					{errors?.date_of_birth?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.pesel?.message}>
				<FormLabel>PESEL: </FormLabel>
				<Input
					{...register('pesel')}
					defaultValue={formValues.pesel}
					onChange={(e) => handleFormValuesChange(e, 'pesel')}
					placeholder="PESEL"
					type={'number'}
				/>
				<FormErrorMessage>
					{errors?.pesel?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.gender?.message}>
				<FormLabel>{t('gender')} </FormLabel>
				<Select
					{...register('gender', {
						onChange: (e) => handleFormValuesChange(e, 'gender'),
					})}
					defaultValue={formValues.gender ?? 'DEFAULT'}>
					<option hidden disabled value="DEFAULT">
						{t('selectGender')}
					</option>
					<option value={'M'}>{t('male')}</option>
					<option value={'F'}>{t('female')}</option>
					<option value={'O'}>{t('other')}</option>
				</Select>
				<FormErrorMessage>
					{errors?.gender?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.role?.message}>
				<FormLabel>{t('role')} </FormLabel>
				<Select
					{...register('role', {
						onChange: (e) => handleFormValuesChange(e, 'role'),
					})}
					defaultValue={formValues.role ?? 'DEFAULT'}>
					<option hidden disabled value="DEFAULT">
						{t('selectRole')}
					</option>
					<option value={'admin'}>{t('admin')}</option>
					<option value={'teacher'}>{t('teacher')}</option>
					<option value={'student'}>{t('student')}</option>
				</Select>

				{watch('role') === 'student' && (
					<FormControl
						isRequired
						isInvalid={!!errors?.class?.message}>
						<FormLabel>{t('deptName')} </FormLabel>
						<Select
							{...register('department', {
								onChange: (e) =>
									handleFormValuesChange(e, 'department_id'),
							})}
							defaultValue={formValues.class ?? 'DEFAULT'}>
							<option hidden disabled value="DEFAULT">
								{t('selectDept')}
							</option>
							{departments?.map((department: any) => (
								<option
									key={department.id}
									value={department.id}>
									{department.name}
								</option>
							))}
						</Select>
						<FormErrorMessage>
							{errors?.class?.message?.toString()}
						</FormErrorMessage>
					</FormControl>
				)}
				<FormErrorMessage>
					{errors?.role?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.disabled?.message}>
				<FormLabel>{t('disabled')} </FormLabel>
				<Select
					{...register('disabled', {
						onChange: (e) => handleFormValuesChange(e, 'disabled'),
					})}
					defaultValue={formValues.role ?? 'DEFAULT'}>
					<option hidden disabled value="DEFAULT">
						{t('selectDisabledStatus')}
					</option>
					<option value={'1'}>{t('yes')}</option>
					<option value={'0'}>{t('no')}</option>
				</Select>
				<FormErrorMessage>
					{errors?.disabled?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.married?.message}>
				<FormLabel>{t('maritalStatus')} </FormLabel>
				<Select
					{...register('married', {
						onChange: (e) => handleFormValuesChange(e, 'married'),
					})}
					defaultValue={formValues.role ?? 'DEFAULT'}>
					<option hidden disabled value="DEFAULT">
						{t('selectMaritalStatus')}
					</option>
					<option value={'1'}>{t('married')}</option>
					<option value={'0'}>{t('single')}</option>
				</Select>
				<FormErrorMessage>
					{errors?.married?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
};
