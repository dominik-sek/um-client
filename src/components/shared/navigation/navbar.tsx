import clsx from 'clsx';
import { SearchBar } from './search-bar';
import {UserMenu} from './user-menu';
import { AppSettings } from './app-settings';
import React from 'react';

export const Navbar = ():JSX.Element =>{
  const [openMenu, setOpenMenu] = React.useState(false);
  const openUserMenu = () => {
    console.log(openMenu)
    setOpenMenu(!openMenu);
  }
  return (
    <div className={'absolute flex items-center px-14 justify-between shadow-2xl backdrop-blur-lg w-full h-16 '}>
      <SearchBar />
      <AppSettings>
        <UserMenu onClick={openUserMenu} open={openMenu}/>
      </AppSettings>

    </div>
  )
}

