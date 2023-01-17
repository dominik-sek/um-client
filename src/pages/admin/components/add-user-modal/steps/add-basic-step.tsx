import { FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function peselValidation(pesel: string | undefined): boolean {
  if (!pesel || pesel.length !== 11) {
    return false;
  }

  let year = parseInt(pesel.substr(0, 2));
  if (year >= 20) {
    //check for people born after 2000
    let sum = 0;
    const controlNumber = parseInt(pesel[10]);

    // check the birth date
    year = parseInt('20' + pesel.substr(0, 2));
    const month = parseInt(pesel.substr(2, 2));
    const day = parseInt(pesel.substr(4, 2));

    if (year < 2000 || year > 2199 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    // calculate the control number
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }
    const calculatedControlNumber = (10 - sum % 10) % 10;
    return controlNumber === calculatedControlNumber;
  } else {
    //check for people born before 2000
    let sum = 0;
    const controlNumber = parseInt(pesel[10]);

    // calculate the control number
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }
    let calculatedControlNumber = 10 - (sum % 10);
    calculatedControlNumber = calculatedControlNumber === 10 ? 0 : calculatedControlNumber;

    return controlNumber === calculatedControlNumber;
  }
}

const schema = yup.object().shape({
  first_name: yup.string().min(3, 'First name must be at least 3 characters long').required('First name is required'),
  last_name: yup.string().min(3, 'Last name must be at least 2 characters long').required('Last name is required'),
  date_of_birth: yup.date().nullable().typeError('Invalid Date'),
  pesel: yup
    .string()
    .max(11, 'PESEL must be 11 characters long')
    .test('pesel', 'Invalid PESEL', peselValidation)
    .required('PESEL is required'),
  gender: yup.string().required('Gender is required').typeError('Invalid gender'),
  role: yup.string().required('Role is required').typeError('Invalid role'),
  disabled: yup.boolean().required('Select disability status').typeError('Invalid value'),
  married: yup.boolean().required('Martial status is required').typeError('Invalid value'),
});

export const AddBasicStep = (props: { setFormValues: (updatedFormValues: any) => void, formValues: any, setAllowNext: (b: boolean) => void }) => {
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
      <FormControl isRequired isInvalid={!!errors?.first_name?.message}>
        <FormLabel>First Name: </FormLabel>
        <Input {...register('first_name')}
               defaultValue={formValues.first_name}
               onChange={e => handleFormValuesChange(e, 'first_name')} required
               placeholder='First name'
               type={'text'} />
        <FormErrorMessage>{errors?.first_name?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.last_name?.message}>
        <FormLabel>Last Name: </FormLabel>
        <Input {...register('last_name')}
               defaultValue={formValues.last_name}
               onChange={e => handleFormValuesChange(e, 'last_name')}
               placeholder='Last name' type={'text'} />
        <FormErrorMessage>{errors?.last_name?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.date_of_birth?.message}>
        <FormLabel>Date of birth: </FormLabel>
        <Input {...register('date_of_birth')}
               defaultValue={formValues.birth_date}
               onChange={e => handleFormValuesChange(e, 'birth_date')}
               type={'date'} />
        <FormErrorMessage>{errors?.date_of_birth?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.pesel?.message}>
        <FormLabel>PESEL: </FormLabel>
        <Input {...register('pesel')}
               defaultValue={formValues.pesel} onChange={e => handleFormValuesChange(e, 'pesel')} placeholder='PESEL'
               type={'number'} />
        <FormErrorMessage>{errors?.pesel?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.gender?.message}>
        <FormLabel>Gender: </FormLabel>
        <Select {...register('gender', {
          onChange: e => handleFormValuesChange(e, 'gender'),
        })}
                defaultValue={formValues.gender ?? 'DEFAULT'}>
          <option hidden disabled value='DEFAULT'>Select gender</option>
          <option value={'M'}>Male</option>
          <option value={'F'}>Female</option>
          <option value={'O'}>Other</option>
        </Select>
        <FormErrorMessage>{errors?.gender?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.role?.message}>
        <FormLabel>Role: </FormLabel>
        <Select {...register('role', {
          onChange: e => handleFormValuesChange(e, 'role'),
        })} defaultValue={formValues.role ?? 'DEFAULT'}>
          <option hidden disabled value='DEFAULT'>Select role</option>
          <option value={'admin'}>Admin</option>
          <option value={'teacher'}>Teacher</option>
          <option value={'student'}>Student</option>
        </Select>
        <FormErrorMessage>{errors?.role?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.disabled?.message}>
        <FormLabel>Disabled: </FormLabel>
        <Select {...register('disabled', {
          onChange: e => handleFormValuesChange(e, 'disabled', 'personal'),
        })} defaultValue={formValues.role ?? 'DEFAULT'}>
          <option hidden disabled value='DEFAULT'>Select disability status</option>
          <option value={'1'}>Yes</option>
          <option value={'0'}>No</option>
        </Select>
        <FormErrorMessage>{errors?.disabled?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.married?.message}>
        <FormLabel>Marital status: </FormLabel>
        <Select {...register('married', {
          onChange: e => handleFormValuesChange(e, 'married', 'personal'),
        })} defaultValue={formValues.role ?? 'DEFAULT'}>
          <option hidden disabled value='DEFAULT'>Select marital status</option>
          <option value={'1'}>Married</option>
          <option value={'0'}>Single</option>
        </Select>
        <FormErrorMessage>{errors?.married?.message?.toString()}</FormErrorMessage>
      </FormControl>
    </form>
  );
};
