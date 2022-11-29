
import React from 'react';
import {CardGroup} from "../components/shared/card/card-group";
import { Body } from '../layout/body';
import {Card} from "../components/shared/card/card";
import {FloatingInput} from "../components/shared/floating-input/floating-input";


export const Profile = ():JSX.Element =>{
  const userProfile = localStorage.getItem('user-profile');
  const userParsed = JSON.parse(userProfile!);

  return(
    <Body navbar>
      <CardGroup>
      <Card className={'!col-span-1'} title={'Contact Info'}>
        {
          Object.keys(userParsed.kontakt).map((key, index) => {
            if(key !== 'adres'){
                return (
                  <div key={index} className={'relative'}>
                    <p>{key}</p>
                    <FloatingInput disabled name={userParsed.kontakt[key]} type={'text'}
                                   placeholder={userParsed.kontakt[key]} />
                  </div>
                )
            }
          })
        }

      </Card>

        <Card className={'!col-span-1'} title={'Your Address'}>
          {Object.keys(userParsed.kontakt.adres).map((key, index) => {
            if(key !== 'id'){
            return (
              <div className={'relative'} key={index}>
                <p>{key}</p>
                <FloatingInput disabled name={userParsed.kontakt.adres[key]} type={'text'}
                               placeholder={userParsed.kontakt.adres[key]} />
              </div>
            )}
          })
          }

        </Card>

        <Card className={'!col-span-1'} title={'Your Profile Info'}>
          {Object.keys(userParsed).map((key, index) => {
            if(key !== 'kontakt'){
            return (
              <div className={'relative'} key={index}>
                <p>{key}</p>
                <FloatingInput disabled name={userParsed[key]} type={'text'}
                               placeholder={userParsed[key]} />
              </div>
            )}
          })}
        </Card>

      </CardGroup>
    </Body>
  )
}
export default Profile;

