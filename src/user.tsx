import { createContext, useContext, useState } from 'react'

const Context = createContext({
  userProfile: {},
  setUserProfile: (user: any) => {},
  userRole: '',
  setUserRole: (role: string) => {},
  isUserLoggedIn: false,
  setIsUserLoggedIn: (isLoggedIn: boolean) => {},
});
export const UserProvider = ({ children }:any) => {
const [userProfile, setUserProfile] = useState({});
  const [userRole, setUserRole] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <Context.Provider
      value={{
        userProfile,
        setUserProfile,
        userRole,
        setUserRole,
        isUserLoggedIn,
        setIsUserLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useUserContext = () => useContext(Context);