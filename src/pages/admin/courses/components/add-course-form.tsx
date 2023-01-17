import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { addressContactSchema as schema } from '../../../../../forms/yup-schemas';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import onFormValueChange from '../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../../../api/users';
import { person } from '@prisma/client';
import { getAllFaculties } from '../../../../api/faculties';
import { getAllDepartments } from '../../../../api/departments';

export const AddCourseForm = (props: { formValues: any, setFormValues: Dispatch<SetStateAction<any>> }) => {
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

  const [teachers, setTeachers] = useState([]);

  const { data: departments, isLoading: departmentsLoading } = useQuery('getAllDepartments', getAllDepartments, {
    refetchOnWindowFocus: false,
  });
  const { data: users, isLoading: usersLoading } = useQuery('fetchAllUsers', fetchAllUsers, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (users) {
      setTeachers(users.filter((user: { role: string; }) => user.role === 'teacher' || user.role === 'admin'));
    }
  }, [users]);
  
  return (
    <form>
      <Flex flexDir={'column'}>
        <FormControl>
          <FormLabel>Course name</FormLabel>
          <Input {...register('name', {
            onChange: e => handleFormValuesChange(e, 'name'),
          })} />
        </FormControl>

        <FormControl>
          <FormLabel>Course type</FormLabel>
          <Select {...register('type', {
            onChange: e => handleFormValuesChange(e, 'type'),
          })} >
            <option value='laboratory'>Laboratory</option>
            <option value='lecture'>Lecture</option>
            <option value='exercise'>Exercise</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>ECTS</FormLabel>
          <Input {...register('ects', {
            onChange: e => handleFormValuesChange(e, 'ects'),
          })} />
        </FormControl>

        <FormControl>
          <FormLabel>Semester in which the course takes place</FormLabel>
          <Input {...register('semester', {
            onChange: e => handleFormValuesChange(e, 'semester'),
          })} />
        </FormControl>

        <FormControl>
          <FormLabel>Teacher</FormLabel>
          <Select  {...register('person', {
            onChange: e => handleFormValuesChange(e, 'person_id'),
          })}>
            {teachers.map((teacher: person) => (
              <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
            ))}

          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Department</FormLabel>
          <Select  {...register('department', {
            onChange: e => handleFormValuesChange(e, 'department_id'),
          })}>
            {departments?.map((department: { id: number; name: string; }) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}

          </Select>
        </FormControl>

      </Flex>
    </form>

  );
};