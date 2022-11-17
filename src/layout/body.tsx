import React from 'react';
import { Navbar } from '../components/shared/navigation/navbar';
import clsx from 'clsx';

interface BodyProps {
  children?: React.ReactNode;
  navbar?: boolean;
  className?: string;
  isLoginPage?: boolean;
}

export const Body = (props:BodyProps) =>{

  return (
    <div className={clsx('relative h-screen w-full flex text-2xl ml-72 text-white ', props.className)}>
      {
        props.navbar && <Navbar />
      }

      {
        props.isLoginPage
          ?
          props.children :
          <main className={'overflow-auto pt-16 p-6 w-full scrollbar scrollbar-thumb-blue-light/10 scrollbar-thin'}>
            <div className={'p-8'}>
              {props.children}
            </div>
          </main>
      }

    </div>
  );
}
