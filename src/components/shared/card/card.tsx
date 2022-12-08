import clsx from 'clsx';
import { Header } from '../../../typography/header/header';
import { HeaderLevel } from '../../../enums/header-level';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  noDivide?: boolean;
  button?: React.ReactNode;
}

export const Card = (props: CardProps): JSX.Element => {
  return (
    <div
      className={clsx('bg-gray-medium p-6 rounded-md h-full dark-boxshadow', props.className, props.noDivide ? '' : 'divide-y divide-white/30')}>
      {props.title &&
        <div>
          <Header className={'flex justify-between items-center'} level={HeaderLevel.H4}>
            {props.title}
            {props.button}
          </Header>
        </div>
      }
      <div className={'text-base h-full'}>
        {props.children}
      </div>

    </div>
  );
};