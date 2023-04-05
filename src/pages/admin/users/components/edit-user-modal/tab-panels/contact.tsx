import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressContactSchema as schema } from '../../../../../../../forms/yup-schemas';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import onFormValueChange from '../../../../../../functions/onFormValueChange';
import { useTranslation } from 'react-i18next';

export const Contact = (props: {
	formValues: any;
	setFormValues: (updated: any) => void;
}) => {
	const { formValues, setFormValues } = props;
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
			<FormControl isRequired isInvalid={!!errors?.email?.message}>
				<FormLabel>E-mail </FormLabel>
				<Input
					{...register('email')}
					defaultValue={formValues?.email}
					onChange={(e) =>
						handleFormValuesChange(e, 'email', 'contact')
					}
					required
					placeholder="Email"
					type={'email'}
				/>
				<FormErrorMessage>
					{errors?.email?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors?.phone_number?.message}>
				<FormLabel>{t('phone')} </FormLabel>
				<Input
					{...register('phone_number')}
					defaultValue={formValues?.phone_number}
					onChange={(e) =>
						handleFormValuesChange(e, 'phone_number', 'contact')
					}
					required
					placeholder="Phone number"
					type={'text'}
				/>
				<FormErrorMessage>
					{errors?.phone_number?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
};
