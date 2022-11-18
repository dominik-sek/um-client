import clsx from 'clsx';
import { SearchBar } from './search-bar';
import {UserMenu} from './user-menu';
import { AppSettings } from './app-settings';
import React from 'react';

export const Navbar = ():JSX.Element =>{
  const [openMenu, setOpenMenu] = React.useState(false);
  const userProfile = localStorage.getItem('user-profile');
  let userParsed = '';
  if(userProfile){
    userParsed = JSON.parse(userProfile);
  }

  const openUserMenu = () => {
    setOpenMenu(!openMenu);
  }
  return (
    <div className={'absolute flex items-center px-14 justify-between shadow-2xl backdrop-blur-lg w-full h-16 z-20 '}>
      <SearchBar />
      <AppSettings>
        <UserMenu user={userParsed} onClick={openUserMenu} open={openMenu}/>
      </AppSettings>

    </div>
  )
}

