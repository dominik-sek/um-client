import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const Button = (props:ButtonProps) =>{
  return(
    <button className={clsx('bg-blue-light py-2 px-6 rounded-sm text-sm font-bold hover:bg-blue-light/40', props.className)}>
        {props.children}
    </button>
  )
}
