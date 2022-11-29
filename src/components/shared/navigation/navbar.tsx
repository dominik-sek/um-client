import { SearchBar } from './search-bar';
import {UserMenu} from './user-menu';
import { AppSettings } from './app-settings';
import React from 'react';
import { DropdownMenu } from './dropdown-menu';
import { LinkButton } from '../link-button/link-button';

export const Navbar = ():JSX.Element =>{
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  const user = JSON.parse(localStorage.getItem('user')!);

  const openUserMenu = () => {
    setOpenMenu(!openMenu);
  }
  const openSettingsMenu = () => {
    setOpenSettings(!openSettings);
  }
  return (
    <div className={'absolute inline-flex z-50 !justify-between items-center ' +
      'px-6  ml-20 left-0 right-0 shadow-2xl backdrop-blur-lg h-16 z-20 '}>
      <SearchBar />
      <div className={'flex relative !gap-x-5 '}>

        <div className={'relative flex'}>
          <AppSettings onClick={openSettingsMenu} isMenuOpen={openSettings}  />
          {
            openSettings &&
            <DropdownMenu>
              <LinkButton url={'/'} title={'Language'} icon={'🏁'} onClick={openSettingsMenu}/>
            </DropdownMenu>
          }
        </div>
        <div className={'relative flex'}>

        <UserMenu user={user} onClick={()=>{openUserMenu()}}/>

        {openMenu &&
          <DropdownMenu>
            <LinkButton url={'/profile'} title={'Profile'} icon={'🧑'} onClick={openUserMenu}/>
            <LinkButton url={'/settings'} title={'Settings'} icon={'⚙'} onClick={openUserMenu}/>
            <LinkButton url={'/logout'} title={'Logout'} icon={'📴'} onClick={openUserMenu}/>
          </DropdownMenu>
        }
        </div>

      </div>


    </div>
  )
}

