import { HeaderLevel } from '../../enums/header-level';
import React from 'react';
import clsx from 'clsx';

//TODO: add paths in tsconfig

interface HeaderProps {
  level: HeaderLevel;
  children: React.ReactNode;
  className?: string;
}

export const Header = (props: HeaderProps): JSX.Element => {
  switch (props.level) {
    case HeaderLevel.H1:
      return <h1 className={clsx('font-medium text-6xl', props.className)}>{props.children}</h1>;
    case HeaderLevel.H2:
      return <h2 className={clsx('font-bold text-4xl', props.className)}>{props.children}</h2>;
    case HeaderLevel.H3:
      return <h3 className={clsx('font-medium text-2xl', props.className)}>{props.children}</h3>;
    case HeaderLevel.H4:
      return <h4 className={clsx('font-medium text-base', props.className)}>{props.children}</h4>;
  }
};