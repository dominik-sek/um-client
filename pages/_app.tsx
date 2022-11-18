import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { RouteGuard } from '../src/RouteGuard';
import Sidebar from '../src/components/shared/navigation/sidebar';



function MyApp({ Component, pageProps }: AppProps) {
  // const [user, setUser] = useState(null);
  // // pass user to local storage
  // const value = { user, setUser };
  // <UserContext.Provider value={value}>

return(

  <div className={'flex'}>
    <RouteGuard>
      {pageProps.noSidebar ? null : <Sidebar />}
      <Component {...pageProps} />
    </RouteGuard>
  </div>
)}

export default MyApp;
