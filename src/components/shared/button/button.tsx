import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      onSubmit={props.onSubmit}
      onClick={props.onClick}
      disabled={props.disabled}
      className={clsx('bg-blue-light py-2 px-6 rounded-sm text-sm font-bold hover:bg-blue-light/40',
        props.className,
        props.disabled && 'bg-blue-light/20 cursor-not-allowed')}>

      {props.children}
    </button>
  );
};
