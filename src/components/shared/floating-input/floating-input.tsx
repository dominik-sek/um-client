import React from 'react';
import clsx from 'clsx';

interface InputProps {
  className?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FloatingInput = (props:InputProps) =>{
  return(
    <div className={clsx('', props.className)}>
      <input onChange={props.onChange}
             type={props.type} id={props.name}
             className="block px-2.5  pb-2.5 pt-4 w-full text-sm  border border-gray-light/20 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
             placeholder=' ' />
      <label htmlFor={props.name}
             className="absolute text-sm bg-gray-medium text-gray-light duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
        {props.placeholder}
      </label>
    </div>

  )
}