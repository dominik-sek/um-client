import { useNavigate } from 'react-router-dom';
import { Box, Center } from '@chakra-ui/react';

const NotFound = (): JSX.Element => {
	const navigate = useNavigate();
	navigate('/', { replace: true });

	return (
		<Box w={'100%'} h={'100%'}>
			<Center w={'100%'} h={'100%'}>
				404
			</Center>
		</Box>
	);
};
export default NotFound;
