import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object().shape({
  city: yup.string().min(3, 'City must be at least 3 characters long').required(),
  state: yup.string().min(3, 'State must be at least 3 characters long').required(),
  country: yup.string().matches(/^[A-Z]{2}$/, 'Country code must be exactly 2 charaters long').required(),
  postal_code: yup.string().matches(/^[0-9]{2}-[0-9]{3}$/, 'Invalid postal code'),
  street: yup.string().required(),
  email: yup.string().email().required(),
  phone_number: yup.string().required().matches(/^[0-9]{9}$/, 'Phone number must be exactly 9 digits long'),

});

export const AddAddressStep = (props: { setFormValues: (updatedFormValues: any) => void, formValues: any, setAllowNext: (b: boolean) => void }) => {
  const { setFormValues, formValues, setAllowNext } = props;
  const { register, handleSubmit, watch, formState: { errors, isValid }, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: formValues,
  });
  const handleFormValuesChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string,
    propertyName?: string) => {

    const newField = { [fieldName]: event.target.value };
    if (propertyName) {
      const updatedFormValues = { ...formValues, [propertyName]: { ...formValues[propertyName], ...newField } };
      setFormValues(updatedFormValues);
    } else {
      const updatedFormValues = { ...formValues, ...newField };
      setFormValues(updatedFormValues);
    }
  }, [formValues, setFormValues]);

  useEffect(() => {
    setAllowNext(isValid);
  }, [isValid]);

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <FormControl isInvalid={false} display={'flex'} justifyContent={'center'}>
        <FormErrorMessage>Please fill out all of the required fields</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors?.city?.message}>
        <FormLabel>City </FormLabel>
        <Input {...register('city')}
               defaultValue={formValues?.address?.city}
               onChange={e => handleFormValuesChange(e, 'city', 'address')} required
               placeholder='City'
               type={'text'} />
        <FormErrorMessage>{errors?.city?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.state?.message}>
        <FormLabel>State </FormLabel>
        <Input {...register('state')}
               defaultValue={formValues?.address?.state}
               onChange={e => handleFormValuesChange(e, 'state', 'address')} required
               placeholder='State'
               type={'text'} />
        <FormErrorMessage>{errors?.state?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.country?.message}>
        <FormLabel>Country code </FormLabel>
        <Input {...register('country')}
               defaultValue={formValues?.address?.country}
               onChange={e => handleFormValuesChange(e, 'country', 'address')} required
               placeholder='Country'
               type={'text'} />
        <FormErrorMessage>{errors?.country?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.postal_code?.message}>
        <FormLabel>Postal Code </FormLabel>
        <Input {...register('postal_code')}
               defaultValue={formValues?.address?.postal_code}
               onChange={e => handleFormValuesChange(e, 'postal_code', 'address')} required
               placeholder='00-000'
               type={'text'} />
        <FormErrorMessage>{errors?.postal_code?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.street?.message}>
        <FormLabel>Street </FormLabel>
        <Input {...register('street')}
               defaultValue={formValues?.address?.street}
               onChange={e => handleFormValuesChange(e, 'street', 'address')} required
               placeholder='Street'
               type={'text'} />
        <FormErrorMessage>{errors?.street?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.email?.message}>
        <FormLabel>E-mail </FormLabel>
        <Input {...register('email')}
               defaultValue={formValues?.contact?.email}
               onChange={e => handleFormValuesChange(e, 'email', 'contact')} required
               placeholder='Email'
               type={'email'} />
        <FormErrorMessage>{errors?.email?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.phone_number?.message}>
        <FormLabel>Phone number </FormLabel>
        <Input {...register('phone_number')}
               defaultValue={formValues?.contact?.phone_number}
               onChange={e => handleFormValuesChange(e, 'phone_number', 'contact')} required
               placeholder='Phone number'
               type={'text'} />
        <FormErrorMessage>{errors?.phone_number?.message?.toString()}</FormErrorMessage>
      </FormControl>

    </form>
  );
};
