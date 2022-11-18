import React from 'react';
import { DropdownMenu } from './dropdown-menu';
interface userMenuProps {
  onClick?: () => void;
  open?: boolean;
  user?: any;
}
export const UserMenu = (props: userMenuProps):JSX.Element =>{

  const {imie, nazwisko} = props.user;
  return (
    <div onClick={props.onClick} className={'relative flex items-center border border-gray-light/20 rounded-md bg-gray-light/10 text-sm cursor-pointer'}>
      <div className={'flex items-center gap-x-4 px-2 py-1'}>
        <div>
          Hi, <span className={'font-bold'}>{imie + ' ' + nazwisko}</span>
        </div>
        <div>
          <img className={'w-8 h-8 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'}/>
        </div>
      </div>
      {props.open && <DropdownMenu />}
    </div>
  );

}

