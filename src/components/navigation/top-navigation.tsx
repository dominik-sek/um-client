import { Header } from '../../typography/header/header';
import { HeaderLevel } from '../../enums/header-level';
import { User } from '../user';
import React from 'react';
import { useRouter } from 'next/router';
import { routes } from '../../utils/routes';



export const TopNavigation = () =>{

  const router = useRouter();
  const routeNames = routes.map((route)=>{
    return {name: route.name, path: route.path}
  })
  const currentRoute = routeNames.find((route)=>route.path === router.pathname);

  return(
    <nav className={'absolute p-6 flex h-24 w-full items-center justify-between'}>
      <Header level={HeaderLevel.H2}>{currentRoute!.name}</Header>
      <User />
    </nav>
  )
}