import { LinkButton } from '../link-button/link-button';
import React from 'react';

export const DropdownMenu = () =>{
  return (
    <div className={'absolute top-10 w-full h-fit flex flex-col  border border-t-0 border-gray-light/50 rounded-b-md bg-gray-dark shadow-2xl backdrop-blur-lg'}>

      <LinkButton url={'/'} title={'Profile'} icon={<i className={'fas fa-user h-full'}/>}/>
      <LinkButton url={'/'} title={'Settings'} icon={<i className={'fas fa-cog'}/>}/>
      <LinkButton url={'/login'} title={'Logout'} icon={<i className={'fas fa-sign-out-alt'}/>}/>
    </div>
  )
}