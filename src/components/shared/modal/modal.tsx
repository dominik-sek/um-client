import { Portal } from 'react-portal';
import { Card } from '../card/card';
import React from 'react';

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  open?: boolean;
  title?: string;
}


export const Modal = (props: ModalProps) => {
  const closeButton = () => {
    return (
      <button
        onClick={props.onClose}>
        <svg className={'w-6 h-6'} viewBox='0 0 24 24'>
          <path fill='currentColor'
                d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' />
        </svg>
      </button>
    );
  };
  return (
    <Portal>
      <div className='absolute top-0 w-full h-full z-50 bg-black/80 flex justify-center items-center'
           aria-labelledby='modal-title'
           role='dialog'
           aria-modal='true'
      >

        {/*wrapper*/}
        <Card title={props.title} button={closeButton()} className={'h-4/5 w-3/4'}>
          {props.children}
        </Card>
      </div>
    </Portal>
  );
};
