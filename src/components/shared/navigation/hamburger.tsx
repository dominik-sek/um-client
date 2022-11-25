import clsx from "clsx";

interface HamburgerProps{
  menuOpen:boolean;
  onClick:()=>void;
  visible?:boolean;
}

export const Hamburger = (props:HamburgerProps):JSX.Element => {
  return(
    <button className={clsx(['flex flex-col gap-y-2 w-10 h-10 z-50 justify-center'])} onClick={props.onClick}>
      <span className={clsx(['block h-1 w-full bg-white transition-all duration-300', !props.menuOpen && 'rotate-45 translate-y-2'])}/>
      <span className={clsx(['block h-1 w-full bg-white transition-all duration-300', !props.menuOpen && 'translate-x-4 opacity-0'])}/>
      <span className={clsx(['block h-1 w-full bg-white transition-all duration-300', !props.menuOpen && '-rotate-45 -translate-y-4'])}/>
    </button>
  )
}