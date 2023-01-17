import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { addressContactSchema as schema } from '../../../../../forms/yup-schemas';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import onFormValueChange from '../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../../../api/users';
import { person } from '@prisma/client';

export const AddFacultyForm = (props: { formValues: any, setFormValues: Dispatch<SetStateAction<any>> }) => {
  const { setFormValues, formValues } = props;
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

  const { data: users, isLoading } = useQuery('fetchAllUsers', fetchAllUsers, {
    refetchOnWindowFocus: false,
  });
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    if (users) {
      setTeachers(users.filter((user: { role: string; }) => user.role === 'teacher' || user.role === 'admin'));
    }
  }, [users]);

  return (
    <form>
      <Flex flexDir={'column'}>
        <FormControl>
          <FormLabel>Faculty name</FormLabel>
          <Input {...register('name', {
            onChange: e => handleFormValuesChange(e, 'name'),
          })} />
        </FormControl>

        <FormControl>
          <FormLabel>Dean</FormLabel>
          <Select  {...register('person', {
            onChange: e => handleFormValuesChange(e, 'person_id'),
          })}>
            {teachers.map((teacher: person) => (
              <option key={teacher.id}
                      value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
            ))}

          </Select>

        </FormControl>
      </Flex>
    </form>

  );
};