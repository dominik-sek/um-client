import type { NextPage } from 'next';
import React, { useContext } from 'react';
import { Body } from '../src/layout/body';
import { useUserContext } from '../src/user';
import { useRouter } from 'next/router';
const Home: NextPage = () => {

  const user = useUserContext();
  const router = useRouter();
  if(user.userRole.role){
    router.push(`/${user.userRole.role}`);
  }

  return (
    <Body>
    </Body>
  );
};
export default Home;
