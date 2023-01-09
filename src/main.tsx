import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient} contextSharing={true}>
      <ChakraProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </ChakraProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
