import { Body } from '../layout/body';
import { CardGroup } from '../components/shared/card/card-group';
import { Card } from '../components/shared/card/card';
import { fetchProfile } from '../api/user/fetch-profile';
import { useQuery } from 'react-query';
import React from 'react';
import { FloatingInput } from '../components/shared/floating-input/floating-input';
import { Button } from '../components/shared/button/button';
import { updateProfile } from '../api/user/update-profile';

export const Settings = (): JSX.Element => {
  const userQuery = useQuery('userProfile', fetchProfile);
  const userProfile = userQuery.data;
  const [edit, setEdit] = React.useState(false);
  const [editUser, setEditUser] = React.useState(userProfile);

  const handleSave = (event: React.FormEvent) => {
    setEdit(!edit);
    event.preventDefault();
    console.log(editUser);
    updateProfile(editUser).then(
      () => {
        console.log('profile updated');
      },
    );
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);
    const wrapper = e.target.parentNode?.parentNode?.parentNode as HTMLDivElement;
    if (wrapper.id === 'kontakt') {
      setEditUser({
        ...editUser,
        kontakt: {
          ...editUser.kontakt,
          [e.target.id]: e.target.value,
          adres: {
            ...editUser.kontakt.adres,
          },
        },
      });
    } else if (wrapper.id === 'adres') {
      setEditUser({
        ...editUser,
        kontakt: {
          ...editUser.kontakt,
          adres: {
            ...editUser.kontakt.adres,
            [e.target.id]: e.target.value,
          },
        },
      });
    } else {
      setEditUser({
        ...editUser,
        [e.target.id]: e.target.value,
      });
    }


  };


  return (
    <Body>
      <CardGroup className={'grid h-screen !grid-cols-6 grid-rows-6 pb-0'}>

        <Card noDivide
              className={'row-span-2 flex flex-col relative h-full p-0 col-span-full col-start-1 lg:col-span-4 lg:col-start-2 row-span-2 '}>
          <div className={'!h-2/3 bg-black relative'}>
            {/* random background image: */}
            <img className={'absolute top-0 left-0 w-full h-full object-cover rounded-t object-top'}
                 src={'https://source.unsplash.com/random/1920x1080'} alt={'random'} />
            <div className={'absolute w-6 h-6 bottom-0 right-0 cursor-pointer'}>
              📷
            </div>

            <div
              className={'rounded-full bg-green-50 w-24 h-24 z-20 absolute -bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 '}>
              <img src={'https://i.pravatar.cc/300'} className={'rounded-full w-full h-full object-cover'} />
              <div className={'w-full flex justify-center text-center whitespace-nowrap pt-4 '}>
                {userProfile.imie + ' ' + userProfile.nazwisko}
              </div>
              <div className={'absolute bottom-0 right-0 cursor-pointer rounded-full bg-white flex'}>
                📷
              </div>
            </div>
          </div>
        </Card>

        <Card title={'Your information'}
              className={'row-span-1 relative col-span-full col-start-1 lg:col-start-2 lg:col-span-4 row-span-4'}>

          <form
            onSubmit={handleSave}
            className={'pt-6 grid grid-cols-1 gap-y-6 md:grid-cols-3 grid-rows-auto h-4/5 ' +
              'gap-y-2 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-blue-light/20'}>

            <div className={'flex flex-col gap-y-6 items-center'}>
              {
                Object.keys(userProfile).map((key, index) => {
                  if (key !== 'kontakt') {
                    return (
                      <div className={'relative w-fit'} key={index}>

                        <FloatingInput
                          placeholder={key}
                          name={key}
                          disabled={key === 'pesel' || key === 'data_urodzenia'}
                          type={key === 'pesel' ? 'number' : 'text'}
                          onChange={handleOnChange}
                          defaultValue={userProfile[key]} />

                      </div>
                    );
                  }
                })}
            </div>
            <div id={'kontakt'} className={'flex flex-col gap-y-6 items-center'}>
              {
                Object.keys(userProfile.kontakt).map((key, index) => {
                  if (key !== 'adres') {
                    return (
                      <div key={index} className={'relative w-fit'}>

                        <FloatingInput
                          name={key}
                          type={key === 'email' ? 'email' : key === 'nr_telefonu' ? 'tel' : 'text'}
                          onChange={handleOnChange}
                          defaultValue={userProfile.kontakt[key]}
                          placeholder={key} />
                      </div>
                    );
                  }
                })
              }
            </div>
            <div id={'adres'} className={'flex flex-col gap-y-6 items-center'}>
              {Object.keys(userProfile.kontakt.adres).map((key, index) => {
                if (key !== 'id') {
                  return (
                    <div className={'relative w-fit'} key={index}>
                      <FloatingInput
                        name={key}
                        onChange={handleOnChange}
                        defaultValue={userProfile.kontakt.adres[key]}
                        type={key === 'kod_pocztowy' || key === 'nr_domu' ? 'number' : 'text'}
                        placeholder={key}
                      />
                    </div>
                  );
                }
              })
              }
            </div>
            <div className={'flex absolute bottom-0 right-0 gap-x-2'}>
              <Button disabled={!edit} type={'submit'}>Save Changes</Button>
              <Button className={'!bg-gray-light'}>Discard Changes</Button>
            </div>
          </form>


        </Card>


      </CardGroup>
    </Body>
  );
};
export default Settings;
