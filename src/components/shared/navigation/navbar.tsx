import clsx from 'clsx';

export const Navbar = ():JSX.Element =>{
  //shadow-2xl backdrop-blur-lg <- on scroll down
  return (
    <div className={'absolute flex items-center px-6 justify-between shadow-2xl backdrop-blur-lg w-full h-16 '}>
      <div className={''}>
        🔎
      </div>
      <div>
        user info
      </div>
    </div>
  )
}