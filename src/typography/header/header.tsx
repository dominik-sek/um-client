import { HeaderLevel } from '../../enums/header-level';
import React from 'react';
//TODO: add paths in tsconfig

interface HeaderProps {
  level: HeaderLevel;
  children: React.ReactNode;

}
export const Header = (props: HeaderProps):JSX.Element => {
  switch (props.level) {
    case HeaderLevel.H1:
      return <h1 className={'font-medium text-6xl'}>{props.children}</h1>;
    case HeaderLevel.H2:
      return <h2 className={'font-bold text-4xl'}>{props.children}</h2>;
    case HeaderLevel.H3:
      return <h3 className={'font-medium text-2xl'}>{props.children}</h3>;
    case HeaderLevel.H4:
      return <h4 className={'font-medium text-base'}>{props.children}</h4>;
  }
}