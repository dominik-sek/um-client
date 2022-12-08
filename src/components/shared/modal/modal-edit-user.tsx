import { FloatingInput } from '../floating-input/floating-input';
import React from 'react';

interface ModalEditProps {
  user: any;
}

export const ModalEditUser = (props: ModalEditProps) => {
  const userContact = props.user.kontakt;
  const userAddress = userContact.adres;
  return (
    <div
      className={' overflow-auto h-full grid grid-cols-3 grid-rows-auto w-full py-10 scrollbar scrollbar-thin scrollbar-thumb-blue-light/20'}>
      <div className={'flex flex-col gap-y-6 items-center'}>
        {
          Object.keys(props.user!).map((key, index) => {
            //if key is null or undefined just use empty string
            const value = props.user![key] ? props.user![key] : '';
            if (typeof value === 'object' && key !== 'kontakt') {
              return (
                Object.keys(value).map((innerKey, innerIndex) => {
                  return (
                    <div className={'w-fit relative h-fit'}>
                      <FloatingInput
                        placeholder={innerKey === 'nazwa' ? 'rola' : innerKey}
                        name={innerKey}
                        // disabled={key === 'id' || key === 'kontakt_id'}
                        // type={key === 'pesel' ? 'number' : 'text'}
                        // @ts-ignore
                        defaultValue={value[innerKey]} />
                    </div>
                  );
                })
              );
            }
            if (key !== 'kontakt' && key !== 'rola_id' && key !== 'adres' && typeof value !== 'object') {
              return (
                <div className={'w-fit relative h-fit'}>
                  <FloatingInput
                    placeholder={key}
                    name={key}
                    disabled={key === 'id' || key === 'kontakt_id'}
                    type={key === 'pesel' ? 'number' : 'text'}
                    defaultValue={value} />
                </div>
              );
            }
          })
        }

      </div>
      <div className={'flex flex-col gap-y-6 items-center'}>
        {
          Object.keys(userContact).map((key, index) => {
              //@ts-ignore
              if (key !== 'adres_id' && typeof userContact[key] !== 'object') {
                return (
                  <div className={'w-fit relative h-fit'}>
                    <FloatingInput
                      placeholder={key}
                      name={key}
                      disabled={key === 'id' || key === 'kontakt_id'}
                      type={key === 'pesel' ? 'number' : 'text'}
                      // @ts-ignore
                      defaultValue={userContact[key]} />
                  </div>
                );
              }
            },
          )
        }
      </div>
      <div className={'flex flex-col gap-y-6 items-center'}>
        {
          Object.keys(userAddress).map((key, index) => {
            //@ts-ignore
            if (key !== 'adres_id' && typeof userAddress[key] !== 'object') {
              return (
                <div className={'w-fit relative h-fit'}>
                  <FloatingInput
                    placeholder={key}
                    name={key}
                    disabled={key === 'id' || key === 'kontakt_id'}
                    type={key === 'pesel' ? 'number' : 'text'}
                    // @ts-ignore
                    defaultValue={userAddress[key]} />
                </div>
              );
            }
          })
        }

      </div>
    </div>
  );

};