import React, { ReactNode, useEffect, useState } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Avatar, Badge,
	Box,
	BoxProps,
	CloseButton, Container,
	Divider,
	Drawer,
	DrawerContent,
	Flex,
	FlexProps,
	HStack,
	Icon,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { FiChevronDown, FiGlobe, FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';
import {useNotifStore, useUserStore} from '../../../store';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BiMessageAlt } from 'react-icons/all';
import { changeLanguage } from 'i18next';
import { GB, PL } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';
import AutocompleteSearchbar, {User} from './search/autocomplete-searchbar';
import { UserRole } from '../../enums/user-role';
export default function SidebarWithNavbar({
	children,
}: {
	children: ReactNode;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')} >
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="xs">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<MobileNav onOpen={onOpen} />
			<Container p="4" pt={'24'} id={'container'} maxW={'container.xl'} margin={'0px auto'} >
					{children}
			</Container>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const user = useUserStore((state) => state.user);

	const { t } = useTranslation();
	const accordionBg = useColorModeValue('cyan.600', 'cyan.800');
	const accordionColor = useColorModeValue('gray.900', 'white');

	return (
		<Box
			zIndex={20}
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w="full"
			pos="fixed"
			h="full"
			{...rest}>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Logo
				</Text>
				<CloseButton display={'flex'} onClick={onClose} />
			</Flex>

			<Accordion allowToggle p="2" role="group" cursor="pointer">
				<VStack align={'stretch'} divider={<Divider />}>
					{routes.map((route) => {
						const roleBasedPath = `/${user.role}${route.path}`;
						if (
							route.permission.includes('*' as UserRole) ||
							route.permission.includes(user.role as UserRole)
						) {
							if (route.subRoutes) {
								route.subRoutes = route.subRoutes.filter(
									(subRoute) =>
										subRoute.permission.includes(
											'*' as UserRole,
										) ||
										subRoute.permission.includes(
											user.role as UserRole,
										),
								);
							}

							if (
								route.subRoutes &&
								route.subRoutes?.length > 0
							) {
								return (
									<AccordionItem
										border={'none'}
										px={4}
										key={route.name}>
										<AccordionButton
											_hover={{
												bg: accordionBg,
												color: accordionColor,
											}}
											borderRadius={'lg'}
											p={2}
											display={'flex'}
											gap={4}
											w={'100%'}>
											{route.icon && (
												<Icon as={route.icon} />
											)}
											<Box
												as={'span'}
												flex={1}
												textAlign={'left'}>
												{t(route.key)}
											</Box>

											<AccordionIcon
												justifySelf={'end'}
											/>
										</AccordionButton>
										<AccordionPanel w="full" pb={'0'}>
											{route.subRoutes &&
												route.subRoutes.map(
													(subRoute) => {
														const subRoleBasedPath = `/${user.role}${subRoute.path}`;
														if (
															subRoute.permission.includes(
																'*' as UserRole,
															) ||
															subRoute.permission.includes(
																user.role as UserRole,
															)
														) {
															return (
																<NavItem
																	mx={0}
																	icon={
																		subRoute.icon
																	}
																	to={
																		subRoleBasedPath
																	}
																	key={
																		subRoute.name
																	}>
																	{t(
																		subRoute.key,
																	)}
																</NavItem>
															);
														}
													},
												)}
										</AccordionPanel>
									</AccordionItem>
								);
							} else {
								return (
									<NavItem
										icon={route.icon}
										key={route.name}
										to={
											route.permission.includes(
												'*' as UserRole,
											)
												? route.path
												: roleBasedPath
										}>
										{t(route.key)}
									</NavItem>
								);
							}
						}
					})}
					;
				</VStack>
			</Accordion>
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	to: string;
}

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
	return (
		<Link
			as={RouterLink}
			to={to}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}>
			<Flex
				align="center"
				p="2"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: useColorModeValue('cyan.600', 'cyan.800'),
					color: useColorModeValue('gray.900', 'white'),
				}}
				{...rest}>
				{icon && <Icon mr="4" fontSize="16" as={icon} />}
				{children}
			</Flex>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [user, setUser] = useState(useUserStore.getState().user);
	const [totalUnreadCount, setTotalUnreadCount] = useState(useNotifStore.getState().totalUnreadCount);
	// const totalUnreadCount = 0;
	useEffect(() => {
		const unsubUser = useUserStore.subscribe((newState) => {
			setUser(newState.user);
		});
		const unsubNotif = useNotifStore.subscribe((newState) => {
			setTotalUnreadCount(newState.totalUnreadCount);
		});

		return () => {
			unsubUser();
			unsubNotif();
		};
	}, []);

	const { t } = useTranslation();
	const navigate = useNavigate();

	const generateRouteSuggestions = () => {
		return routes.reduce<string[]>((routeNames, route) => {
			if (route.subRoutes) {
				return routeNames.concat(
					route.subRoutes.filter(
						(subRoute) =>
							subRoute.permission.includes('*' as UserRole) ||
							subRoute.permission.includes(user.role as UserRole)
					).map((subRoute) => t(subRoute.key))
				);
			}
			if (
				route.permission.includes('*' as UserRole) ||
				route.permission.includes(user.role as UserRole)
			) {
				routeNames.push(t(route.key));
			}
			return routeNames;
		}, []);
	};


	const handleSuggestionSelect = (suggestion: string | User) => {
		const route = routes.find((route) =>
			route.subRoutes
				? route.subRoutes.some((subRoute) => t(subRoute.key) === suggestion)
				: t(route.key) === suggestion
		);

		if (route) {
			const subRoute = route.subRoutes?.find((subRoute) => t(subRoute.key) === suggestion);
			const hasWildcardPermission = subRoute?.permission.includes('*' as UserRole) || route.permission.includes('*' as UserRole);
			const hasUserRolePermission = subRoute?.permission.includes(user.role as UserRole) || route.permission.includes(user.role as UserRole);
			if (hasWildcardPermission || hasUserRolePermission) {
				navigate(subRoute ? `/${user.role}${subRoute.path}` : route.path);
			}
		}
	};

	return (
		<Flex
			px={{ base: 4, md: 4 }}
			pl="4"
			alignItems="center"
			position={'fixed'}
			top={'0'}
			left={'0'}
			w={'100%'}
			height={20}
			zIndex={10}
			id={'navbar'}
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			gap={'4'}
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'space-between' }}
			{...rest}>
			<IconButton
				display="flex"
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>
			<Flex display={{ base: 'none', sm: 'flex' }} w={'100%'}>
				<AutocompleteSearchbar
					w={'100%'}
					suggestions={generateRouteSuggestions()}
					onSuggestionSelected={(suggestion) => {
						handleSuggestionSelect(suggestion);
					}}
					searchPlaceholder={t('searchApp') as string}
				/>
			</Flex>
			<HStack spacing={{ base: '2', md: '4' }}>
				<Menu>
					<Flex position={'relative'}>
						<MenuButton
							as={IconButton}
							aria-label={'Open Messages'}
							icon={<BiMessageAlt />}
							onClick={() => navigate('/messages')}
						/>
						{
							totalUnreadCount > 0 && (
								<Badge
									colorScheme="red"
									bgColor={'red.500'}
									position="absolute"
									top="-10%"
									right="-20%">
									{totalUnreadCount}
								</Badge>
							)
						}
					</Flex>
				</Menu>

				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Language menu"
						icon={<FiGlobe />}
					/>
					<MenuList p={'0'}>
						<MenuItem
							onClick={() => changeLanguage('en')}
							display={'flex'}

							gap={2}>
							<GB width={'36'} /> English
						</MenuItem>
						<MenuItem
							onClick={() => changeLanguage('pl')}
							display={'flex'}
							gap={2}>
							<PL width={'36'} /> Polski
						</MenuItem>
					</MenuList>
				</Menu>

				<IconButton
					aria-label={'Toggle Color Mode'}
					onClick={toggleColorMode}
					icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
				/>

				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={
										user.account?.account_images
											?.avatar_url || ''
									}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2">
									<Flex>
										<Text fontSize="sm" fontWeight="medium">
											{user.first_name?.length > 10
												? user.first_name.slice(0, 10) +
												  '...'
												: user.first_name}
										</Text>
									</Flex>
									<Text fontSize="xs" color="gray.600">
										{t(user.role as UserRole)}
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.700')}
							borderColor={useColorModeValue(
								'white',
								'gray.700',
							)}
							p={'0'}
						>
							<Link as={RouterLink} to={'/profile'}>
								<MenuItem>{t('profileSettings')}</MenuItem>
							</Link>
							<MenuDivider
								p={'0'}
								m={'0'}
								borderColor={useColorModeValue(
									'gray.200',
									'gray.600',
								)}
							/>
							<Link as={RouterLink} to={'/logout'}>
								<MenuItem>{t('signOut')}</MenuItem>
							</Link>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
