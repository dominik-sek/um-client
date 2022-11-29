import React from 'react';
import clsx from 'clsx';
import { Button } from '../button/button';
import { Link } from "react-router-dom";

interface LinkProps{
  url: string;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  notif?: boolean;
  hasCta?: boolean;
  ctaText?: string;
  textColorClass?: string;
  iconOnly?: boolean;
}
export const LinkButton = (props: LinkProps):JSX.Element =>{

  return (
    <Link to={props.url}>
      <div onClick={props.onClick}
         className={clsx('flex justify-between cursor-pointer w-full p-2 hover:bg-gray-light/10 rounded-md',
           props.selected && 'bg-blue-light/20 text-blue-light',
           props.className)}>
        <div className={clsx('flex w-full')}>
              <div className={'flex items-center justify-center gap-x-2 text-gray-light'}>
                {props.icon && <div className={' w-8 h-8 flex items-center justify-center '}>{props.icon} </div>}
                {
                  !props.iconOnly && <div>{props.title}</div>
                }

              </div>

          {
            props.children &&
            <div className={clsx('w-full flex items-center justify-center text-gray-light', props.textColorClass)}>
              {props.children}
            </div>
          }

          {
              props.hasCta && (
                <div className={'flex items-center'}>
                  <Button>{props.ctaText}</Button>
                </div>
              )
          }
        </div>
        {
            props.notif &&(
            <div className={clsx('rounded-full bg-blue-light w-10 flex justify-center',)}>
              29
            </div>
          )
        }

      </div>
    </Link>
  );
}