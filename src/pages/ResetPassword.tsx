import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel, Heading, IconButton,
  Input,
  Stack, Text,
  useColorModeValue, useToast,
  Wrap,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { passwordChangeSchema as schema } from '../../forms/yup-schemas';
import { resetPassword } from '../api/password';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const { register, handleSubmit, watch, formState: { errors, isValid }, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const { t } = useTranslation();

  const { mutate: resetPasswordMutation } = useMutation(resetPassword, {
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: t('success'),
        description: t('resetPasswordSuccess'),
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: t('error'),
        description: t('resetPasswordError'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleResetPassword = () => {
    resetPasswordMutation({ token: token, password: password });
  };
  return (
    <Flex
      minH={'100vh'}
      minW={'100vw'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.100', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          <Flex gap={4}>
            <IconButton as={Link} to={'/login'} aria-label={'back'} icon={<ArrowBackIcon />} />
            {t('changePassword')}
          </Flex>
        </Heading>
        <FormControl isInvalid={!!errors?.password?.message}>
          {Object.keys(errors).map((key) => {
            return <FormErrorMessage key={key}>{errors[key]?.message?.toString()}</FormErrorMessage>;
          })}

        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.password?.message}>
          <FormLabel>{t('password')}: </FormLabel>
          <Input
            {...register('password')}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder={t('password') ?? ''}
            type={'password'} />
        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.password_confirmation?.message}>
          <FormLabel>{t('confirmPassword')} </FormLabel>
          <Input
            {...register('password_confirmation')}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder={t('confirmPassword') ?? ''}
            type={'password'} />
        </FormControl>

        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            disabled={!!errors?.password?.message || !!errors?.password_confirmation?.message}
            onClick={handleSubmit(handleResetPassword)}
          >
            {t('changePassword')}
          </Button>
        </Stack>
      </Stack>
    </Flex>

  );
};

export default ResetPassword;
