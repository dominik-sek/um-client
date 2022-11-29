import React, { useContext } from 'react';
import {Spinner} from "../components/shared/spinner/spinner";
import {useNavigate} from "react-router-dom";
import {Body} from "../layout/body";
import {LinkButton} from "../components/shared/link-button/link-button";
import {fetchProfile} from "../api/user/fetch-profile";

const Home = () => {
    const role = localStorage.getItem('role');
    console.log(role)
    const navigate = useNavigate();

    //redirect to /role if user is logged in
    React.useEffect(() => {
        if (role) {
            navigate(`/${role}`);
        }
    }
    ,[])


  return (
    <Spinner />
  )

};
export default Home;
