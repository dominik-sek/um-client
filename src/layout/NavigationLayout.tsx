import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import SidebarWithNavbar from '../components/shared/sidebar-with-navbar';

const NavigationLayout = () => {
	return (
		<Flex w={'100%'} h={'100%'} direction={'column'}>
			<SidebarWithNavbar>
				<Outlet />
			</SidebarWithNavbar>
		</Flex>
	);
};
export default NavigationLayout;
