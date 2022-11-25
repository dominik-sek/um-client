import React, { ForwardedRef } from 'react';
interface DropdownProps {
  children?: React.ReactNode;
}
export const DropdownMenu = React.forwardRef((props: DropdownProps, ref:ForwardedRef<HTMLDivElement>) =>{
  return (
    <div ref={ref} className={'!absolute top-14 right-0 min-w-[12rem] h-fit flex flex-col rounded-b-md bg-gray-800 shadow-2xl backdrop-blur-lg'}>
      {props.children}
    </div>
  )
})