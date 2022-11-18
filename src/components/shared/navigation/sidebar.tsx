import clsx from 'clsx';
import { LinkButton } from '../link-button/link-button';
import React, { useState } from 'react';
import { routes } from '../../../constants/routes';

interface SidebarProps {
  userRole: string;
}
export const Sidebar = (props: SidebarProps):JSX.Element =>{

  const [selected, setSelected] = useState<string>('');

  return(
    <nav className={clsx('dark-boxshadow flex flex-col gap-y-5 text-base overflow-auto bg-gray-medium h-full w-72 absolute p-4 scrollbar scrollbar-thumb-blue-light/10 scrollbar-thin',)}>
      <div className={'h-1/6 flex border items-center justify-center'}>
        LOGO
      </div>
      <div className={'h-full flex flex-col gap-y-1'}>
        {routes.map((route) => (
          (route.permission == null || route.permission.some(val => val == props.userRole)) ?
            <LinkButton
              key={route.name}
              url={route.path}
              title={route.name}
              notif
              onClick={() => setSelected(route.name)}
              selected={selected === route.name}
            />
            : null
        ))}
      </div>
    </nav>
  )
}


export default Sidebar;