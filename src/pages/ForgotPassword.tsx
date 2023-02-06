import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  Heading, IconButton,
  Input, Stack,
  Text,
  useColorModeValue, useToast, Wrap,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { forgotPassword } from '../api/password';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ForgotPassword = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const { mutate: sendResetPasswordEmail } = useMutation(forgotPassword, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('forgotEmailSent'),
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('forgotEmailError'),
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

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
            {t('forgotPassword')}
          </Flex>
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          {t('forgotPasswordMessage')}
        </Text>
        <FormControl id='email'>
          <Input
            placeholder={t('emailPlaceholder') ?? 'email'}
            _placeholder={{ color: 'gray.500' }}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => sendResetPasswordEmail(email)}>
            {t('requestReset')}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};