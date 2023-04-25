import {
	Box,
	Button,
	Code,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement, Menu, MenuButton,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	MenuList,
	MenuItem,
	Wrap, useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {ChevronDownIcon, MoonIcon, SunIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import { loginUser } from '../api/login-user';
import { useMutation, useQuery } from 'react-query';
import { checkAuth } from '../api/check-auth';
import {Form, useNavigate} from 'react-router-dom';
import { useAuthStore, useUserStore } from '../../store';
import { fetchUserProfile } from '../api/users';
import { useTranslation } from 'react-i18next';
import { GB, PL } from 'country-flag-icons/react/3x2';
import { Link } from 'react-router-dom';


export default function Login() {
	const { t, i18n } = useTranslation();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState(false);
	const [isEverythingLoading, setIsEverythingLoading] = useState(false);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const handleUsernameChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setFormError(false);
		setUsername(event.target.value);
	};
	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setFormError(false);
		setPassword(event.target.value);
	};
	const navigate = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();

	const { refetch: refetchProfile, isLoading:refetchLoading } = useQuery(
		'fetchUserProfile',
		() => fetchUserProfile(),
		{
			enabled: false,
			refetchOnWindowFocus: false,
		},
	);

	const { data: authData, refetch: refetchAuth, isLoading: refetchAuthLoading } = useQuery(
		'checkAuth',
		() => checkAuth(),
		{
			enabled: false,
			refetchOnWindowFocus: false,
		},
	);

	const { mutate: LoginMutation, isLoading, status } = useMutation(loginUser, {
		onSuccess: (data) => {
			userAuth.setAuth(true);
			userAuth.setRole(data.role);
			userStore.setUser(data);
			refetchProfile().then((response) => {
				userStore.setUser(response.data);
				setIsEverythingLoading((refetchAuthLoading && refetchLoading) && isLoading);
				navigate('/', { replace: true });
			});
		},
		onError: (error) => {
			setIsEverythingLoading((refetchAuthLoading && refetchLoading) && isLoading);
			setFormError(true);
		},
	});
	const selectSampleAccount = (selection: string) => {
		switch (selection) {
			case 'admin':
				LoginMutation({ username:'abbotoneal372', password:'32840473032' });
				setIsEverythingLoading(true)
				break;
			case 'teacher':
				LoginMutation({ username:'lylegregory371', password:'20282483098' });
				setIsEverythingLoading(true)
				break;
			case 'student':
				LoginMutation({ username:'haley10381', password:'49110485529' });
				setIsEverythingLoading(true)
				break;
		}
	};
	const userStore = useUserStore((state) => state);
	const userAuth = useAuthStore();
	useEffect(() => {
		refetchAuth().then((res) => {
			if (res.data.auth) {
				navigate('/');
			}
		});
	}, [navigate, refetchAuth, userAuth.auth]);
	const handleLogin = () => {
		if (username === '' || password === '') {
			setFormError(true);
			return;
		}
		setIsEverythingLoading(true);
		LoginMutation({ username, password });

	};

	const [isLargerThanMobile] = useMediaQuery('(min-width: 480px)');

	return (
		<Flex
			minH={'100vh'}
			minW={'100%'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.200', 'gray.700')}>

			<Flex
				h={!isLargerThanMobile ? '100%' : ''}
				w={!isLargerThanMobile ? '100%' : ''}
				alignItems={'center'}
				py={'6'}
				px={'2'}
				rounded={'lg'}
				boxShadow={'lg'}
				bg={useColorModeValue('white', 'blackAlpha.300')}>
				<Stack spacing={8} mx={'auto'} px={6}>
				<Stack spacing={10}>
					<HStack
						display={'flex'}
						justifyContent={'space-between'}>
						<Wrap>
							<IconButton
								p={1}
								aria-label={'English'}
								icon={<GB />}
								onClick={() => changeLanguage('en')}
							/>
							<IconButton
								p={1}
								aria-label={'Polish'}
								icon={<PL />}
								onClick={() => changeLanguage('pl')}
							/>
						</Wrap>
						<Wrap>
							<IconButton
								aria-label={'Toggle Color Mode'}
								onClick={toggleColorMode}
								icon={
									colorMode === 'light' ? (
										<MoonIcon />
									) : (
										<SunIcon />
									)
								}
							/>
						</Wrap>
					</HStack>
					<Stack align={'center'}>
						<Heading fontSize={'3xl'} textAlign={'center'}>
							{t('login-screen.message')}
						</Heading>
					</Stack>
					<Menu matchWidth>
						<MenuButton
							as={Button}
							rightIcon={<ChevronDownIcon />}
							colorScheme={'teal'}>
							{t('login-screen.select-account')}
						</MenuButton>
						<MenuList >
							<MenuItem onClick={() => selectSampleAccount('admin')}>
								{t('admin')} - Abbot Oneal
							</MenuItem>
							<MenuItem onClick={() => selectSampleAccount('teacher')}>
								{t('teacher')} - Lyle Gregory
							</MenuItem>
							<MenuItem onClick={() => selectSampleAccount('student')}>
								{t('student')} - Adrian Haley
							</MenuItem>
						</MenuList>


					</Menu>
				<form >
					<Stack spacing={4}>
					<FormControl isInvalid={formError}>
						<FormErrorMessage>
							{t('login-screen.validate-error')}
						</FormErrorMessage>
						<FormControl
							id="username"
							isRequired
							isInvalid={formError}>
							<FormLabel>
								{t('login-screen.username')}
							</FormLabel>
							<Input
								type="text"
								value={username}
								onChange={handleUsernameChange}
							/>
						</FormControl>
						<FormControl
							id="password"
							isRequired
							isInvalid={formError}>
							<FormLabel>
								{t('login-screen.password')}
							</FormLabel>
							<InputGroup>
								<Input
									type={
										showPassword ? 'text' : 'password'
									}
									onChange={handlePasswordChange}
								/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword(
												(showPassword) =>
													!showPassword,
											)
										}>
										{showPassword ? (
											<ViewIcon />
										) : (
											<ViewOffIcon />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
					</FormControl>

					<Flex flexDir={'column'}>
						<Link to={'/forgot-password'}>
							<Text color={'blue.400'}>
							{t('login-screen.forgot-password')}
							</Text>
						</Link>
						<Link to={'/forgot-password'}>
							<Text color={'red.400'}>
								{t('login-screen.contact-admin')}
							</Text>
						</Link>
					</Flex>

						<Button
							loadingText={
								t('login-screen.sign-in-btn-loading') ??
								'Loading...'
							}
							isLoading={isEverythingLoading}
							size="lg"
							type={'submit'}
							width={'100%'}
							bg={'blue.400'}
							color={'white'}
							_hover={{
								bg: 'blue.500',
							}}
							onClick={handleLogin}>
							{t('login-screen.sign-in-btn')}
						</Button>
					</Stack>
					</form>
				</Stack>
			</Stack>
			</Flex>


		</Flex>
	);
}
