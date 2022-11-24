import { SearchBar } from './search-bar';
import {UserMenu} from './user-menu';
import { AppSettings } from './app-settings';
import React, { useContext } from 'react';
import { useUserContext } from '../../../user';

export const Navbar = ():JSX.Element =>{
  const [openMenu, setOpenMenu] = React.useState(false);
  const user = useUserContext()

  const openUserMenu = () => {
    setOpenMenu(!openMenu);
  }
  return (
    <div className={'absolute flex z-50 ml-72 left-0 right-0 items-center px-14 justify-between shadow-2xl backdrop-blur-lg h-16 z-20 '}>
      <SearchBar />
      <AppSettings>
        <UserMenu user={user.userProfile} onClick={openUserMenu} open={openMenu}/>
      </AppSettings>

    </div>
  )
}

