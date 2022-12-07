import React from 'react';

interface userMenuProps {
  onClick?: () => void;
  user?: any;
}

export const UserMenu = (props: userMenuProps): JSX.Element => {
  
  return (
    <div onClick={props.onClick}
         className={'flex items-center border ' +
           'border-gray-light/20 rounded-full md:rounded-md bg-gray-light/10 text-sm cursor-pointer min-w-[2rem] min-h-[2rem] lg:w-48'}>
      <div className={'flex items-center gap-x-4 md:px-2 md:py-1'}>
        <div className={'hidden lg:block'}>
          Hi, <span className={'font-bold'}>{props.user.imie + ' ' + props.user.nazwisko}</span>
        </div>
        <div>
          <img className={'w-8 h-8 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'} />
        </div>
      </div>

    </div>
  );

};

