import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {loginUser} from "../../api/login-user";
import {useQuery} from "react-query";
import {checkAuth} from "../../api/check-auth";
import {Navigate} from "react-router-dom";
import LoadingScreen from "../common/loading-screen";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) =>  setUsername(event.target.value);
    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) =>  setPassword(event.target.value);

    const { data, isLoading, isError } = useQuery('checkAuth', checkAuth);
    if(data){
        if(data.auth) return <Navigate to={'/'} replace />;
    }

    const handleLogin = () => {
        loginUser(username, password)
            .then((response)=>{
                if (response.status === 200) {
                    console.log('Logged in');
                    window.location.href = '/';
                }
            })
            .catch((error)=>{
                //set error
            })
    }


    return (
        <Flex
            minH={'100vh'}
            minW={'100vw'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.500', 'black.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign in to your account
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>

                        <FormControl id="username" isRequired >
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Text align={'right'}>
                            <Link color={'blue.400'}>Forgot your password?</Link>
                        </Text>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Loading..."
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleLogin}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6} direction={'column'} align={'center'}>
                            <Link color={'red.400'}>Contact an administrator</Link>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}