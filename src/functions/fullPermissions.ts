import {UserData} from "../types/User";

// const user = useUserStore(state => state.user);
export const fullPermissions = (user: UserData) =>{
    return user.id === 508 && user.first_name==='Dominik';
}