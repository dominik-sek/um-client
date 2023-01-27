import { FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalSchema as schema } from '../../../../../../../forms/yup-schemas';
import onFormValueChange from '../../../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { getAllDepartments } from '../../../../../../api/departments';

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
    onFormValueChange(event, fieldName, formValues, setFormValues, propertyName);
  }, [formValues, setFormValues]);

  useEffect(() => {
    setAllowNext(isValid);
  }, [isValid]);
  const { data: departments, isLoading: departmentsLoading } = useQuery('getAllDepartments', getAllDepartments, {
    refetchOnWindowFocus: false,
  });


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

        {watch('role') === 'student' && (
          <FormControl isRequired isInvalid={!!errors?.class?.message}>
            <FormLabel>Department: </FormLabel>
            <Select {...register('department', {
              onChange: e => handleFormValuesChange(e, 'department_id'),
            })} defaultValue={formValues.class ?? 'DEFAULT'}>
              <option hidden disabled value='DEFAULT'>Select department</option>
              {departments?.map((department: any) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </Select>
            <FormErrorMessage>{errors?.class?.message?.toString()}</FormErrorMessage>
          </FormControl>
        )}
        <FormErrorMessage>{errors?.role?.message?.toString()}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.disabled?.message}>
        <FormLabel>Disabled: </FormLabel>
        <Select {...register('disabled', {
          onChange: e => handleFormValuesChange(e, 'disabled'),
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
          onChange: e => handleFormValuesChange(e, 'married'),
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
