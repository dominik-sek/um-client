import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressContactSchema as schema } from '../../../../../../../forms/yup-schemas';
import onFormValueChange from '../../../../../../functions/onFormValueChange';
import { useTranslation } from 'react-i18next';

export const AddAddressStep = (props: { setFormValues: (updatedFormValues: any) => void, formValues: any, setAllowNext: (b: boolean) => void }) => {
  const { setFormValues, formValues, setAllowNext } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, watch, formState: { errors, isValid }, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: formValues,
  });
  const handleFormValuesChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string,
    propertyName?: string) => {
    onFormValueChange(event, fieldName, formValues, setFormValues, propertyName);
  }, [formValues, setFormValues]);

  useEffect(() => {
    setAllowNext(isValid);
  }, [isValid]);

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <FormControl isInvalid={false} display={'flex'} justifyContent={'center'}>
        <FormErrorMessage>{t('fillRequired')}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors?.city?.message}>
        <FormLabel>{t('city')}</FormLabel>
        <Input {...register('city')}
               defaultValue={formValues?.address?.city}
               onChange={e => handleFormValuesChange(e, 'city')} required
               placeholder={t('city')}
               type={'text'} />
        <FormErrorMessage>{errors?.city?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.state?.message}>
        <FormLabel>{t('state')}</FormLabel>
        <Input {...register('state')}
               defaultValue={formValues?.address?.state}
               onChange={e => handleFormValuesChange(e, 'state')} required
               placeholder={t('state')}
               type={'text'} />
        <FormErrorMessage>{errors?.state?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.country?.message}>
        <FormLabel>{t('country')}</FormLabel>
        <Input {...register('country')}
               defaultValue={formValues?.address?.country}
               onChange={e => handleFormValuesChange(e, 'country')} required
               placeholder='PL'
               type={'text'} />
        <FormErrorMessage>{errors?.country?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.postal_code?.message}>
        <FormLabel>{t('zipCode')}</FormLabel>
        <Input {...register('postal_code')}
               defaultValue={formValues?.address?.postal_code}
               onChange={e => handleFormValuesChange(e, 'postal_code')} required
               placeholder='00-000'
               type={'text'} />
        <FormErrorMessage>{errors?.postal_code?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.street?.message}>
        <FormLabel>{t('street')} </FormLabel>
        <Input {...register('street')}
               defaultValue={formValues?.address?.street}
               onChange={e => handleFormValuesChange(e, 'street')} required
               placeholder={t('street')}
               type={'text'} />
        <FormErrorMessage>{errors?.street?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.email?.message}>
        <FormLabel>E-mail </FormLabel>
        <Input {...register('email')}
               defaultValue={formValues?.contact?.email}
               onChange={e => handleFormValuesChange(e, 'email')} required
               placeholder='Email'
               type={'email'} />
        <FormErrorMessage>{errors?.email?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.phone_number?.message}>
        <FormLabel>{t('phone')}</FormLabel>
        <Input {...register('phone_number')}
               defaultValue={formValues?.contact?.phone_number}
               onChange={e => handleFormValuesChange(e, 'phone_number')} required
               placeholder='123456789'
               type={'text'} />
        <FormErrorMessage>{errors?.phone_number?.message?.toString()}</FormErrorMessage>
      </FormControl>

    </form>
  );
};
