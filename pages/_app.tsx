import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../src/components/navigation/navbar';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp;
