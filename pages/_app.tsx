import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { RouteGuard } from '../src/RouteGuard';
import Sidebar from '../src/components/shared/navigation/sidebar';
import { fetchUserRole } from '../src/api/user/fetch-user-role';
import { Navbar } from '../src/components/shared/navigation/navbar';
import { useRouter } from 'next/router';
import { fetchProfile } from '../src/api/user/fetch-profile';
import { UserProvider, useUserContext } from '../src/user';

function MyApp({ Component, pageProps }: AppProps) {
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
