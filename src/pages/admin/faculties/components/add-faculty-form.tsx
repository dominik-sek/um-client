import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Select} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { addFacultySchema as schema } from '../../../../../forms/yup-schemas';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import onFormValueChange from '../../../../functions/onFormValueChange';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../../../api/users';
import { person } from '@prisma/client';
import { useTranslation } from 'react-i18next';

export const AddFacultyForm = (props: { formValues: any, setFormValues: Dispatch<SetStateAction<any>>, setIsFormValid: Dispatch<SetStateAction<boolean>> }) => {
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

  const { t } = useTranslation();
    useEffect(()=>{
      props.setIsFormValid(isValid);
    },[isValid, props])

  return (
    <form>
      <Flex flexDir={'column'}>
        <FormControl isRequired isInvalid={!!errors?.name?.message}>
          <FormErrorMessage>{t('nameRequired')}</FormErrorMessage>
          <FormLabel>{t('name')}</FormLabel>
          <Input minLength={1} isRequired {...register('name', {
            onChange: e => handleFormValuesChange(e, 'name'),
          })} />
        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.person?.message}>
          <FormErrorMessage>{t('personRequired')}</FormErrorMessage>
          <FormLabel>{t('dean')}</FormLabel>
          <Select isRequired  {...register('person', {
            onChange: e => handleFormValuesChange(e, 'person_id'),
          })}>
            <option value={''}  >Select teacher</option>
            {teachers.map((teacher: person) => (
              <option key={teacher.id}
                      value={teacher.id}
              >{teacher.first_name} {teacher.last_name}</option>
            ))}

          </Select>

        </FormControl>
      </Flex>
    </form>

  );
};