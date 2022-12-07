import clsx from 'clsx';
import { LinkButton } from '../link-button/link-button';
import React, { useEffect, useState } from 'react';
import { routes } from '../../../constants/routes';
import { Hamburger } from './hamburger';
import { useQuery } from 'react-query';
import { fetchUserRole } from '../../../api/user/fetch-user-role';
import { Spinner } from '../spinner/spinner';


export const Sidebar = (): JSX.Element => {
  const roleQuery = useQuery('userRole', fetchUserRole);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectAndHide = (route: string) => {
    setSelected(route);
    setHidden(true);
  };

  useEffect(() => {
    if (roleQuery.data) {
      setRole(roleQuery.data.role);
      setIsLoading(roleQuery.isLoading);
    }
  }, [roleQuery.data]);


  //click outside to close
  useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setHidden(true);
        }

      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    , []);

  return (
    isLoading ? <Spinner /> :
      (
        <nav ref={ref} id={'sidebar'} className={clsx('z-50 shadow-2xl backdrop-blur-lg dark-boxshadow ' +
          'text-base overflow-auto  h-full w-72 absolute p-4 scrollbar ' +
          'scrollbar-thumb-blue-light/10  scrollbar-thin lg:block duration-150 ', hidden && 'w-20')}>

          <div className={clsx('flex justify-start p-2')}>
            <Hamburger menuOpen={hidden} onClick={() => {
              setHidden(!hidden);
            }} />
          </div>
          <div className={'flex flex-col gap-y-1 pt-10'}>
            {routes.map((route) => {
              // prepends the route with the user type
              const roleBasedPath = `/${role}${route.path}`;
              if (route.permission.includes('*') || route.permission.includes(role!)) {
                return (
                  <LinkButton
                    key={route.name}
                    url={route.permission.includes('*') ? route.path : roleBasedPath}
                    title={route.name}
                    onClick={() => selectAndHide(route.path)}
                    selected={selected === route.path}
                    iconOnly={hidden}
                    icon={route.icon}
                    className={''}

                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </nav>
      )
  );
};


export default Sidebar;