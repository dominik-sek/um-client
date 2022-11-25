import type { NextPage } from 'next';
import React, { useContext } from 'react';
import { Body } from '../../src/layout/body';
import { CardGroup } from '../../src/components/shared/card/card-group';
import { Card } from '../../src/components/shared/card/card';
import { LinkButton } from '../../src/components/shared/link-button/link-button';
import { useUserContext } from '../../src/user';


const Home: NextPage = () => {

  const user = useUserContext();
  const profileIcon = () =>{
    return(
      <div className={'flex items-center justify-center'}>
        <img className={'w-10 h-10 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'}/>
      </div>
    )
  }
  return (
    <Body>
      ADMIN PAGE
      <CardGroup>

      </CardGroup>
    </Body>
  );
};
export default Home;
