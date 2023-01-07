import { Body } from '../layout/body';
import { CardGroup } from '../components/shared/card/card-group';
import { fetchProfile } from '../api/user/fetch-profile';
import { useQuery } from 'react-query';
import React from 'react';

export const Settings = (): JSX.Element => {
  const userQuery = useQuery('userProfile', fetchProfile);
  const userProfile = userQuery.data;
  const [edit, setEdit] = React.useState(false);
  const [editUser, setEditUser] = React.useState(userProfile);

  const handleSave = (event: React.FormEvent) => {

  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);

  };


  return (
    <Body>
      <CardGroup className={'grid h-screen !grid-cols-6 grid-rows-6 pb-0'}>

      </CardGroup>
    </Body>
  );
};
export default Settings;
