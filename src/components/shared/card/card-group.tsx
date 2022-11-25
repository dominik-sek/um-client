import React from 'react';

interface CardGroupProps {
  children: React.ReactNode
}
export const CardGroup = (props: CardGroupProps) =>{
  return (
    <div className={'grid grid-cols-1 grid-rows-auto lg:grid-cols-3 lg:grid-rows-auto lg:grid-flow-row-dense gap-6 pb-10 h-full w-full'}>
      {props.children}
    </div>
  )
}