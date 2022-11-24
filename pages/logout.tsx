import { useRouter } from 'next/router';
import React from 'react';
import { Body } from '../src/layout/body';
import { logoutUser } from '../src/api/user/logout-user';
import { useUserContext } from '../src/user';
import { NextPage } from 'next';

export const Logout:NextPage = () =>{
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const user = useUserContext();
  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
      logoutUser()
        .then(() => {
            user.setUserProfile({});
            user.setUserRole({role:''});
            user.setIsUserLoggedIn(false);
            router.push('/login');
          }
        )
    }
  },[])

  return (
    <Body>
      {loading ? <div>Logging out...</div> : null}
    </Body>
  )
}

export default Logout;

export async function getStaticProps(){
  return{
    props:{
      noNavigation: true,
    }
  }
}