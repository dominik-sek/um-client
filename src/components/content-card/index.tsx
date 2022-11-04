import React from 'react';
import { Header } from '../../typography/header/header';
import { HeaderLevel } from '../../enums/header-level';
import clsx from 'clsx';

interface ContentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
export const ContentCard = (props: ContentCardProps) =>{
  //TODO: glassmorphism
  return (
    <div className={clsx('h-full w-full rounded-2xl p-4 bg-white ', props.className)}>
      <Header level={HeaderLevel.H3}>{props.title}</Header>
      <div className={'text-base pt-4 h-fit'}>
        {props.children}
      </div>
    </div>
  )
}