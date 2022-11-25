import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { RouteGuard } from '../src/RouteGuard';
import Sidebar from '../src/components/shared/navigation/sidebar';
import { Navbar } from '../src/components/shared/navigation/navbar';
import { UserProvider, useUserContext } from '../src/user';
interface PageProps {
  noNavigation?: boolean;
}
function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  return(
    <UserProvider>
      {
        (pageProps.noNavigation) ?
          null
          :
          (<div className={''}>
            <Navbar  />
            <Sidebar />
          </div>)
      }
      <RouteGuard>
      <div className={'flex relative'}>
        <Component {...pageProps} />
      </div>
      </RouteGuard>

    </UserProvider>
  )}

export default MyApp;
