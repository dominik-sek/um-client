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

export const ForgotPassword = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const { mutate: sendResetPasswordEmail } = useMutation(forgotPassword, {
    onSuccess: () => {
      toast({
        title: 'Email sent',
        description: 'Check your email for a link to reset your password',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while sending the email',
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
            Forgot your password?
          </Flex>
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id='email'>
          <Input
            placeholder='your-email@example.com'
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
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};