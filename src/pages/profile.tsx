import React from 'react';
import { CardGroup } from '../components/shared/card/card-group';
import { Body } from '../layout/body';
import { Card } from '../components/shared/card/card';
import { FloatingInput } from '../components/shared/floating-input/floating-input';
import { useQuery } from 'react-query';
import { fetchProfile } from '../api/user/fetch-profile';


export const Profile = (): JSX.Element => {

  const userQuery = useQuery('userProfile', fetchProfile);
  const userProfile = userQuery.data;

  return (
    <Body>
      <CardGroup>
        <Card className={'!col-span-1'} title={'Contact Info'}>
          {
            Object.keys(userProfile.kontakt).map((key, index) => {
              if (key !== 'adres') {
                return (
                  <div key={index} className={'relative'}>
                    <p>{key}</p>
                    <FloatingInput disabled name={userProfile.kontakt[key]} type={'text'}
                                   placeholder={userProfile.kontakt[key]} />
                  </div>
                );
              }
            })
          }


        </Card>

        <Card className={'!col-span-1'} title={'Your Address'}>
          {Object.keys(userProfile.kontakt.adres).map((key, index) => {
            if (key !== 'id') {
              return (
                <div className={'relative'} key={index}>
                  <p>{key}</p>
                  <FloatingInput disabled name={userProfile.kontakt.adres[key]} type={'text'}
                                 placeholder={userProfile.kontakt.adres[key]} />
                </div>
              );
            }
          })
          }

        </Card>


        <Card className={'!col-span-1'} title={'Your Profile Info'}>
          {Object.keys(userProfile).map((key, index) => {
            if (key !== 'kontakt') {
              return (
                <div className={'relative'} key={index}>
                  <p>{key}</p>
                  <FloatingInput disabled name={userProfile[key]} type={'text'}
                                 placeholder={userProfile[key]} />
                </div>
              );
            }
          })}
        </Card>

      </CardGroup>
    </Body>
  );
};
export default Profile;

