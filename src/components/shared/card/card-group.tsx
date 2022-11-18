import React from 'react';

interface CardGroupProps {
  children: React.ReactNode
}
export const CardGroup = (props: CardGroupProps) =>{
  return (
    <div className={'grid grid-cols-3 grid-rows-auto grid-flow-row-dense gap-6 h-full w-full'}>
      {props.children}
    </div>
  )
}