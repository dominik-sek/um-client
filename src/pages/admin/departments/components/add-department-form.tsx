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
import { useTranslation } from 'react-i18next';

export const AddDepartmentForm = (props: { formValues: any, setFormValues: Dispatch<SetStateAction<any>> }) => {
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

  const { data: faculties, isLoading } = useQuery('getAllFaculties', getAllFaculties, {
    refetchOnWindowFocus: false,
  });
  const { t } = useTranslation();
  return (
    <form>
      <Flex flexDir={'column'}>
        <FormControl>
          <FormLabel>{t('name')}</FormLabel>
          <Input {...register('name', {
            onChange: e => handleFormValuesChange(e, 'name'),
          })} />
        </FormControl>

        <FormControl>
          <FormLabel>{t('lengthOfStudies')}</FormLabel>
          <Input {...register('length', {
            onChange: e => handleFormValuesChange(e, 'length'),
          })} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('studyType')}</FormLabel>
          <Select {...register('study_type', {
            onChange: e => handleFormValuesChange(e, 'study_type'),
          })} >
            <option value='full-time'>{t('fullTime')}</option>
            <option value='part-time'>{t('partTime')}</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>{t('degree')}</FormLabel>
          <Input {...register('degree', {
            onChange: e => handleFormValuesChange(e, 'degree'),
          })} />
        </FormControl>

        <FormControl>
          <FormLabel>{t('facultyName')}</FormLabel>
          <Select  {...register('faculty', {
            onChange: e => handleFormValuesChange(e, 'faculty_id'),
          })}>
            {
              faculties?.map((faculty: any) => {
                return (
                  <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                );
              })
            }
          </Select>

        </FormControl>
      </Flex>
    </form>

  );
};