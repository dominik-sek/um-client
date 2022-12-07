import React, { ForwardedRef } from 'react';
import clsx from 'clsx';

interface InputProps {
  className?: string;
  name?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isValidationError?: boolean;
  defaultValue?: string;
}

export const FloatingInput = React.forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={clsx('', props.className)}>
      <input onChange={props.onChange}
             type={props.type}
             id={props.name}
             ref={ref}
             defaultValue={props.defaultValue}
             className={clsx(
               ' px-2.5 pb-2.5 pt-4 w-full text-sm border border-gray-light/20 text-gray-900 bg-transparent\n' +
               '             rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500\n' +
               '             focus:outline-none focus:ring-0  focus:border-blue-600 peer\n'
               , props.isValidationError && '!border-red-light !ring-red-light focus',
               props.disabled && '!text-blue-300 !border-blue-300 cursor-not-allowed ')}

             placeholder={' '}

             disabled={props.disabled}
      />
      <label htmlFor={props.name}
             className={clsx('absolute text-base bg-gray-medium text-gray-light duration-300 transform -translate-y-4 scale-75 \n' +
               '             top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 \n' +
               '             peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:top-1/2 \n' +
               '             peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1',
               props.isValidationError && '!text-red-light',
               props.disabled && '!text-blue-300 cursor-not-allowed')}>
        {props.placeholder}
      </label>
    </div>

  );
});

