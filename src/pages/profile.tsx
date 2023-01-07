import React from 'react';
import { CardGroup } from '../components/shared/card/card-group';
import { Body } from '../layout/body';
import { useQuery } from 'react-query';
import { fetchProfile } from '../api/user/fetch-profile';


export const Profile = (): JSX.Element => {


  const userQuery = useQuery('userProfile', fetchProfile);
  const userProfile = userQuery.data;
  console.log(userProfile)

  return (
    <Body>
      <CardGroup>


      </CardGroup>
    </Body>
  );
};
export default Profile;

