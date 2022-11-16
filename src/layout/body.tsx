import React from 'react';
import { Navbar } from '../components/shared/navigation/navbar';

interface BodyProps {
  children?: React.ReactNode;
}

export const Body = (props:BodyProps) =>{

  return (
    <div className={'relative h-screen w-full flex text-2xl ml-72 text-white '}>
      <Navbar />
      <main className={'overflow-auto pt-16 p-6 w-full scrollbar scrollbar-thumb-blue-light/10 scrollbar-thin'}>
        <div className={'p-8'}>
          {props.children}
        </div>
      </main>
    </div>
  );
}
