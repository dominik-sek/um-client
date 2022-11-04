import React from 'react';
import { Navbar } from '../../components/navigation/navbar';
import { TopNavigation } from '../../components/navigation/top-navigation';

interface BodyProps {
  children: React.ReactNode;

}

export const Body = (props:BodyProps) =>{

  return (
    <div className={'font-medium h-screen w-full flex text-2xl text-white'}>
      <Navbar />
      <div className={'w-full pt-6 pr-6 relative'}>
        <TopNavigation />
        <main className={'flex w-full h-full relative pt-24 pb-6 gap-x-5'}>
          {props.children}
        </main>
      </div>
    </div>
  );
}