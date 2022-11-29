import {logoutUser} from "../api/user/logout-user";
import {Spinner} from "../components/shared/spinner/spinner";
import React from "react";
import { useNavigate } from 'react-router-dom';


export const Logout = () =>{
  const [loading, setLoading] = React.useState(false);
    let navigate = useNavigate();
  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
      logoutUser()
        .then(() => {
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            navigate('/login');
          }
        )
    }
  },[])

  return (
    <Spinner />
  )
}

export default Logout;

