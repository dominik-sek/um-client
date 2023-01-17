import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressContactSchema as schema } from '../../../../../../../forms/yup-schemas';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import onFormValueChange from '../../../../../../functions/onFormValueChange';

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

  return (
    <form>
      <FormControl isInvalid={!!errors?.city?.message}>
        <FormLabel>City </FormLabel>
        <Input {...register('city')}
               defaultValue={formValues?.city}
               onChange={e => handleFormValuesChange(e, 'city', 'address')} required
               type={'text'} />
        <FormErrorMessage>{errors?.city?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.state?.message}>
        <FormLabel>State </FormLabel>
        <Input {...register('state')}
               defaultValue={formValues?.state}
               onChange={e => handleFormValuesChange(e, 'state', 'address')} required
               placeholder='State'
               type={'text'} />
        <FormErrorMessage>{errors?.state?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.country?.message}>
        <FormLabel>Country code </FormLabel>
        <Input {...register('country')}
               defaultValue={formValues?.country}
               onChange={e => handleFormValuesChange(e, 'country', 'address')} required
               placeholder='Country'
               type={'text'} />
        <FormErrorMessage>{errors?.country?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.postal_code?.message}>
        <FormLabel>Postal Code </FormLabel>
        <Input {...register('postal_code')}
               defaultValue={formValues?.postal_code}
               onChange={e => handleFormValuesChange(e, 'postal_code', 'address')} required
               placeholder='00-000'
               type={'text'} />
        <FormErrorMessage>{errors?.postal_code?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.street?.message}>
        <FormLabel>Street </FormLabel>
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