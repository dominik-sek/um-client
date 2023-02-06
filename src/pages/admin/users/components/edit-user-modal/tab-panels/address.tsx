import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressContactSchema as schema } from '../../../../../../../forms/yup-schemas';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import onFormValueChange from '../../../../../../functions/onFormValueChange';
import { useTranslation } from 'react-i18next';

export const Address = (props: { formValues: any, setFormValues: (updated: any) => void }) => {
  const { formValues, setFormValues } = props;
  const { register, handleSubmit, formState: { errors } } = useForm({
      mode: 'all',
      resolver: yupResolver(schema),
    },
  );
  const handleFormValuesChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string,
    propertyName?: string) => {
    onFormValueChange(event, fieldName, formValues, setFormValues, propertyName);
  }, [formValues, setFormValues]);
  const { t } = useTranslation();
  return (
    <form>
      <FormControl isInvalid={!!errors?.city?.message}>
        <FormLabel>{t('profile.city')} </FormLabel>
        <Input {...register('city')}
               defaultValue={formValues?.city}
               onChange={e => handleFormValuesChange(e, 'city', 'address')} required
               type={'text'} />
        <FormErrorMessage>{errors?.city?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.state?.message}>
        <FormLabel>{t('profile.state')} </FormLabel>
        <Input {...register('state')}
               defaultValue={formValues?.state}
               onChange={e => handleFormValuesChange(e, 'state', 'address')} required
               placeholder='State'
               type={'text'} />
        <FormErrorMessage>{errors?.state?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.country?.message}>
        <FormLabel>{t('profile.country')} </FormLabel>
        <Input {...register('country')}
               defaultValue={formValues?.country}
               onChange={e => handleFormValuesChange(e, 'country', 'address')} required
               placeholder='Country'
               type={'text'} />
        <FormErrorMessage>{errors?.country?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.postal_code?.message}>
        <FormLabel>{t('profile.zipCode')} </FormLabel>
        <Input {...register('postal_code')}
               defaultValue={formValues?.postal_code}
               onChange={e => handleFormValuesChange(e, 'postal_code', 'address')} required
               placeholder='00-000'
               type={'text'} />
        <FormErrorMessage>{errors?.postal_code?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.street?.message}>
        <FormLabel>{t('profile.street')} </FormLabel>
        <Input {...register('street')}
               defaultValue={formValues?.street}
               onChange={e => handleFormValuesChange(e, 'street', 'address')} required
               placeholder='Street'
               type={'text'} />
        <FormErrorMessage>{errors?.street?.message?.toString()}</FormErrorMessage>
      </FormControl>
    </form>
  );
};