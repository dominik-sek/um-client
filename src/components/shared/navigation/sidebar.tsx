import clsx from 'clsx';
import { LinkButton } from '../link-button/link-button';
import React, { useContext, useState } from 'react';
import { routes } from '../../../constants/routes';
import { useUserContext } from '../../../user';
import { useRouter } from 'next/router';


export const Sidebar = ():JSX.Element =>{
  const user = useUserContext()

  const [selected, setSelected] = useState<string>('');
  return(
    <nav className={clsx('absolute left-0 z-50 dark-boxshadow flex flex-col gap-y-5 text-base overflow-auto bg-gray-medium h-full w-72 absolute p-4 scrollbar scrollbar-thumb-blue-light/10 scrollbar-thin',)}>

      <div className={'h-1/6 flex border items-center justify-center'}>
        LOGO
      </div>
      <div className={'h-full flex flex-col gap-y-1'}>
        {routes.map((route)=>{
          // prepends the route with the user type
          const roleBasedPath = `/${user?.userRole.role}${route.path}`

          if(route.permission.includes('*') || route.permission.includes(user.userRole.role)) {
            return (
              <LinkButton
                key={route.name}
                url={route.permission.includes('*') ? route.path : roleBasedPath}
                title={route.name}
                notif
                onClick={() => setSelected(route.name)}
                selected={selected === route.name}
              />
            )
          }
        })}
      </div>
    </nav>
  )
}


export default Sidebar;