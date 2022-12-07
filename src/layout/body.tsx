import React from 'react';
import clsx from 'clsx';

interface BodyProps {
  children?: React.ReactNode;
  navbar?: boolean;
  className?: string;
  isLoginPage?: boolean;
}

export const Body = (props: BodyProps) => {

  return (

    <div className={clsx('relative h-screen w-full flex text-2xl ml-20 text-white p-2', props.className)}>
      {
        props.isLoginPage
          ?
          props.children :
          <main
            className={'overflow-auto pt-16 pb-6 p-6 w-full scrollbar scrollbar-thumb-blue-light/10 scrollbar-thin'}>
            {/*<div className={'pt-6 w-full min-h-full'}>*/}
            {props.children}
            {/*</div>*/}
          </main>
      }

    </div>
  );
};
