import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
}
const theme = extendTheme({
	config,
	components: {
		Steps,
	}
});

export default theme;
