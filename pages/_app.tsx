import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { RouteGuard } from '../src/RouteGuard';
import Sidebar from '../src/components/shared/navigation/sidebar';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  // const [user, setUser] = useState(null);
  // // pass user to local storage
  // const value = { user, setUser };
  // <UserContext.Provider value={value}>


  return getLayout(
    <div className={'flex'}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </div>
  )
}

export default MyApp;
// @ts-ignore
export async function getServerSideProps({req}) {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/checkauth',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.cookie
      },
      credentials: 'include',

    })
  const data = await res.json()

  // Pass data to the page via props
  return {
    props: { data }
  }
}