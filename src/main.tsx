import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import './i18n';
import LoadingScreen from './components/shared/loading-screen';
import theme from '../theme';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Suspense fallback={<LoadingScreen />}>
			<QueryClientProvider client={queryClient} contextSharing={true}>
				<ChakraProvider theme={theme}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ChakraProvider>
			</QueryClientProvider>
		</Suspense>
	</React.StrictMode>,
);
