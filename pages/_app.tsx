import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { RouteGuard } from '../src/RouteGuard';
import Sidebar from '../src/components/shared/navigation/sidebar';
import { Navbar } from '../src/components/shared/navigation/navbar';
import { UserProvider, useUserContext } from '../src/user';
interface PageProps {
  isLoginPage?: boolean;
}
function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  return(
    <UserProvider>
      <RouteGuard>
      {
        pageProps.isLoginPage ?
          null
          :
          (<div>
            <Navbar />
            <Sidebar />
          </div>)
      }
      <div className={'flex relative'}>
        <Component {...pageProps} />
      </div>
      </RouteGuard>

    </UserProvider>
  )}

export default MyApp;
