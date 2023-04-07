import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalSchema as schema } from '../../../../../../../forms/yup-schemas';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import onFormValueChange from '../../../../../../functions/onFormValueChange';
import { useTranslation } from 'react-i18next';

export const Personal = (props: {
	formValues: any;
	setFormValues: (updated: any) => void;
}) => {
	const { formValues, setFormValues } = props;
	const {
		id,
		first_name,
		last_name,
		title,
		birth_date,
		gender,
		pesel,
		role,
	} = formValues;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema),
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
	const { t } = useTranslation();
	return (
		<form>
			<FormControl isInvalid={!!errors?.first_name?.message}>
				<FormLabel>{t('firstName')} </FormLabel>
				<Input
					{...register('first_name', {
						onChange: (e) =>
							handleFormValuesChange(e, 'first_name'),
					})}
					defaultValue={first_name}
				/>
				<FormErrorMessage>
					{errors?.first_name?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.last_name?.message}>
				<FormLabel>{t('lastName')} </FormLabel>
				<Input
					{...register('last_name', {
						onChange: (e) => handleFormValuesChange(e, 'last_name'),
					})}
					defaultValue={last_name}
				/>
				<FormErrorMessage>
					{errors?.last_name?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.title?.message}>
				<FormLabel>{t('title')} </FormLabel>
				<Input
					{...register('title', {
						onChange: (e) => handleFormValuesChange(e, 'title'),
					})}
					defaultValue={title}
				/>
				<FormErrorMessage>
					{errors?.title?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.birth_date?.message}>
				<FormLabel>{t('dateOfBirth')} </FormLabel>
				<Input
					{...register('birth_date', {
						onChange: (e) =>
							handleFormValuesChange(e, 'birth_date'),
					})}
					defaultValue={new Date(birth_date).toLocaleDateString()}
				// 	key === 'birth_date'
				// ? new Date(
				// value,
				// ).toLocaleDateString()
				// : value
				/>
				<FormErrorMessage>
					{errors?.birth_date?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.pesel?.message}>
				<FormLabel>PESEL: </FormLabel>
				<Input
					disabled
					{...register('pesel', {
						onChange: (e) => handleFormValuesChange(e, 'pesel'),
					})}
					defaultValue={pesel}
				/>
				<FormErrorMessage>
					{errors?.pesel?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.gender?.message}>
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

			<FormControl isInvalid={!!errors?.role?.message}>
				<FormLabel>{t('role')}: </FormLabel>
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
				<FormErrorMessage>
					{errors?.role?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.disabled?.message}>
				<FormLabel>{t('disabled')}: </FormLabel>
				<Select
					{...register('disabled', {
						onChange: (e) =>
							handleFormValuesChange(e, 'disabled', 'personal'),
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

			<FormControl isInvalid={!!errors?.married?.message}>
				<FormLabel>{t('maritalStatus')}</FormLabel>
				<Select
					{...register('married', {
						onChange: (e) =>
							handleFormValuesChange(e, 'married', 'personal'),
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
