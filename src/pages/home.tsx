import React from 'react';
import { Spinner } from '../components/shared/spinner/spinner';
import { useNavigate } from 'react-router-dom';
import { fetchUserRole } from '../api/user/fetch-user-role';
import { useQuery } from 'react-query';

const Home = () => {

  const query = useQuery('userRole', fetchUserRole);
  const navigate = useNavigate();

  React.useEffect(() => {
      if (query.data.role) {
        navigate(`/${query.data.role}`);
      }
    }
    , []);


  return (
    <Spinner />
  );

};
export default Home;
