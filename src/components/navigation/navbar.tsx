import Link from 'next/link';
import { Header } from '../../typography/header/header';
import { HeaderLevel } from '../../enums/header-level';
import { routes } from '../../utils/routes';

export const Navbar = () =>{
  return(
    <div className={'m-6 bg-white p-6 w-72 rounded-3xl flex flex-col gap-y-10'}>
      <div className={'border h-1/4 flex justify-center items-center'}>
      dane adresowe
      </div>

      {routes.map((route) => (
        <Link href={route.path} key={route.name}>
          <a className={'text-base font-medium'}>{route.name}</a>
        </Link>
      ))}
    </div>
  )
}