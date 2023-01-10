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
    Link,
    FormErrorMessage,
    useToast,
    Alert,
    PopoverTrigger,
    Popover,
    useDisclosure,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody, PopoverArrow,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {loginUser} from "../../api/login-user";
import {useQuery} from "react-query";
import {checkAuth} from "../../api/check-auth";
import {Navigate, useNavigate} from "react-router-dom";
import LoadingScreen from "../common/loading-screen";
import {useAuthStore} from "../../../store";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(false);

    const handleUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setFormError(false);
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) =>  {
        setFormError(false);
        setPassword(event.target.value);
    }
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onToggle, onClose } = useDisclosure()

    const { refetch, isLoading} = useQuery('loginUser', () => loginUser(username, password), {
        enabled: false,
        refetchOnWindowFocus: false,
    });
    const userAuth = useAuthStore();
    if(userAuth.auth){
        return <Navigate to={`/`} replace />
    }
    const handleLogin = () => {
        if(username === '' || password === ''){
            setFormError(true);
            return;
        }
        refetch().then((response)=>{
            if(response.isSuccess){
                toast({
                    title: "Logged in.",
                    description: "You have successfully logged in.",
                    status: "success",
                    position: "top",
                    duration: 1500,
                    isClosable: true,
                })
                userAuth.setAuth(true);
                userAuth.setRole(response.data.role);
                setTimeout(()=>{
                    navigate('/');
                },500)
            }else{
                setFormError(true);
            }
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

                    <Stack spacing={4} >

                        <FormControl isInvalid={formError}>
                            <FormErrorMessage>
                                Invalid username or password
                            </FormErrorMessage>
                                <FormControl id="username" isRequired isInvalid={formError} >

                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </FormControl>
                                <FormControl id="password" isRequired isInvalid={formError}>
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
                        </FormControl>

                        <Text align={'right'}>
                            <Link color={'blue.400'}>Forgot your password?</Link>
                        </Text>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Loading..."
                                isLoading={isLoading}
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