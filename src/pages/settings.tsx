import { Body } from '../layout/body';
import { CardGroup } from '../components/shared/card/card-group';
import { Card } from '../components/shared/card/card';
import { fetchProfile } from '../api/user/fetch-profile';
import { useQuery } from 'react-query';
import React from 'react';
import { FloatingInput } from '../components/shared/floating-input/floating-input';
import { Button } from '../components/shared/button/button';

export const Settings = (): JSX.Element => {
  const userQuery = useQuery('userProfile', fetchProfile);
  const userProfile = userQuery.data;
  const [edit, setEdit] = React.useState(false);

  const handleSave = () => {
    setEdit(!edit);

  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);

  };


  return (
    <Body>
      <CardGroup className={'grid h-screen !grid-cols-6 grid-rows-6 pb-0'}>

        <Card noDivide
              className={'row-span-2 flex flex-col relative h-full p-0 col-span-full col-start-1 lg:col-span-4 lg:col-start-2 row-span-2 '}>
          <div className={'!h-2/3 bg-black relative'}>
            {/* random background image: */}
            <img className={'absolute top-0 left-0 w-full h-full object-cover object-top'}
                 src={'https://source.unsplash.com/random/1920x1080'} alt={'random'} />
            <div className={'absolute w-6 h-6 bottom-0 right-0 cursor-pointer'}>
              📷
            </div>

            <div
              className={'rounded-full bg-green-50 w-24 h-24 z-20 absolute -bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 '}>
              <img src={'https://i.pravatar.cc/300'} className={'rounded-full w-full h-full object-cover'} />
              <div className={'w-fit flex flex-col justify-center text-center'}>
                {userProfile.imie + ' ' + userProfile.nazwisko}
              </div>
              <div className={'absolute bottom-0 right-0 cursor-pointer'}>
                📷
              </div>
            </div>
          </div>
        </Card>

        <Card title={'Your information'}
              className={'row-span-1 relative  col-span-full col-start-1 lg:col-start-2 lg:col-span-4 row-span-4'}>

          <div
            className={'pt-6 grid grid-cols-2 md:grid-cols-3 grid-rows-auto h-4/5 gap-y-2 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-blue-light/20'}>

            <div className={'flex flex-col gap-y-2 items-center'}>
              {
                Object.keys(userProfile).map((key, index) => {
                  if (key !== 'kontakt') {
                    return (
                      <div className={'relative w-fit'} key={index}>

                        <FloatingInput
                          placeholder={key}
                          name={key}
                          disabled={key === 'pesel' || key === 'data_urodzenia'}
                          type={'text'}
                          onChange={handleOnChange}
                          defaultValue={userProfile[key]} />

                      </div>
                    );
                  }
                })}
            </div>
            <div className={'flex flex-col gap-y-2 items-center'}>
              {
                Object.keys(userProfile.kontakt).map((key, index) => {
                  if (key !== 'adres') {
                    return (
                      <div key={index} className={'relative w-fit'}>

                        <FloatingInput

                          name={userProfile.kontakt[key]}
                          type={'text'}
                          onChange={handleOnChange}
                          defaultValue={userProfile.kontakt[key]}
                          placeholder={key} />
                      </div>
                    );
                  }
                })
              }
            </div>
            <div className={'flex flex-col gap-y-2 items-center'}>
              {Object.keys(userProfile.kontakt.adres).map((key, index) => {
                if (key !== 'id') {
                  return (
                    <div className={'relative w-fit'} key={index}>
                      <FloatingInput
                        name={userProfile.kontakt.adres[key]}
                        onChange={handleOnChange}
                        defaultValue={userProfile.kontakt.adres[key]}
                        type={'text'}
                        placeholder={key}
                      />
                    </div>
                  );
                }
              })
              }
            </div>
          </div>

          <div className={'flex absolute bottom-0 right-0 gap-x-2'}>
            <Button disabled={!edit} onClick={handleSave}>Save Changes</Button>
            <Button className={'!bg-gray-light'}>Discard Changes</Button>
          </div>

        </Card>


      </CardGroup>
    </Body>
  );
};
export default Settings;
