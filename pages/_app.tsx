import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { useState } from 'react';
import { UserContext } from '../src/UserContext';
import { useContext } from 'react';
import { RouteGuard } from '../src/RouteGuard';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const [user, setUser] = useState(null);
  // pass user to local storage
  const value = { user, setUser };
  return getLayout(
    <UserContext.Provider value={value}>
      <div className={'flex'}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </div>
    </UserContext.Provider>
  )
}

export default MyApp;
