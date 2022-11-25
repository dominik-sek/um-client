import clsx from 'clsx';
import { Header } from '../../../typography/header/header';
import { HeaderLevel } from '../../../enums/header-level';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
}
export const Card = (props: CardProps):JSX.Element =>{
  return(
    <div className={clsx('bg-gray-medium p-6 divide-y divide-white/30 rounded-md h-full dark-boxshadow', props.className)}>
        <div>
          <Header level={HeaderLevel.H3} >
            {props.title}
          </Header>
        </div>
      <div className={'pt-2 text-base'}>
        {props.children}
      </div>

    </div>
  )
}