import React from 'react';
import clsx from 'clsx';

interface CardGroupProps {
  children: React.ReactNode
  className?: string;
}
export const CardGroup = (props: CardGroupProps) =>{
  return (
    <div className={clsx('grid grid-cols-1 grid-rows-auto lg:grid-cols-3 lg:grid-rows-auto lg:grid-flow-row-dense gap-6 pb-10 h-full w-full', props.className)}>
      {props.children}
    </div>
  )
}