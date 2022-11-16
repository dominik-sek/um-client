import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { Sidebar } from '../src/components/shared/navigation/sidebar';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div className={'flex'}>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
