import clsx from 'clsx';
import { LinkButton } from '../link-button/link-button';
import React, { useContext, useEffect, useState } from 'react';
import { routes } from '../../../constants/routes';
import { useUserContext } from '../../../user';
import { useRouter } from 'next/router';
import { Hamburger } from './hamburger';


export const Sidebar = ():JSX.Element =>{
  const user = useUserContext()

  const [selected, setSelected] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectAndHide = (route:string) => {
    setSelected(route);
    setHidden(true);
  }

  //click outside to close
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setHidden(true);
      }

    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }
  ,[]);

  return(
    <nav ref={ref} id={'sidebar'} className={clsx('z-50 dark-boxshadow ' +
      'text-base overflow-auto bg-gray-medium h-full w-72 absolute p-4 scrollbar ' +
      'scrollbar-thumb-blue-light/10 scrollbar-thin lg:block duration-150 ',hidden && 'w-20')}>

      <div className={clsx('flex justify-start p-2')}>
        <Hamburger menuOpen={hidden} onClick={()=>{setHidden(!hidden)}} />
      </div>
        <div className={'flex flex-col gap-y-1 pt-10'}>
        {routes.map((route)=>{
          // prepends the route with the user type
          const roleBasedPath = `/${user?.userRole.role}${route.path}`
          if(route.permission.includes('*') || route.permission.includes(user.userRole.role)) {
            return (
              <LinkButton
                key={route.name}
                url={route.permission.includes('*') ? route.path : roleBasedPath}
                title={route.name}
                onClick={() => selectAndHide(route.path)}
                selected={selected === route.name}
                iconOnly={hidden}
                icon={route.icon}
                className={''}

              />
            )
          }
        })}
      </div>
    </nav>
  )
}


export default Sidebar;