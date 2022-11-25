import { DropdownMenu } from './dropdown-menu';
import { LinkButton } from '../link-button/link-button';
import React from 'react';

interface AppSettingsProps{
  children?: React.ReactNode;
  onClick?: () => void;
  isMenuOpen?: boolean;
}
export const AppSettings = (props:AppSettingsProps):JSX.Element =>{
  return (
    <div onClick={props.onClick}
         className={'flex items-center border ' +
           'border-gray-light/20 rounded-full md:rounded-md bg-gray-light/10 text-sm cursor-pointer w-10 justify-center'}>
      🔧

    </div>
  );
}