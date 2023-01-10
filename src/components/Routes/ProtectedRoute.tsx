import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import {checkAuth} from "../../api/check-auth";
import {Flex, Spinner} from "@chakra-ui/react";
import LoadingScreen from "../common/loading-screen";
import {useAuthStore, useUserStore} from "../../../store";

interface ProtectedRouteProps {
    allowed: string | string[];
}
export const ProtectedRoute = ({allowed}:ProtectedRouteProps): JSX.Element =>{


    const { data, isLoading, isError } = useQuery('checkAuth', checkAuth,{
        refetchOnWindowFocus: false
    })
    if(isLoading){
        return <LoadingScreen />
    }
    const isAuthed = data.auth;
    const userRole = data.role;
    const isRoleAuthed = isAuthed && (allowed.includes('any') || allowed.includes(userRole));

    if (!isAuthed) {
        return <Navigate to={'/login'} replace />;
    }
    if (!isRoleAuthed) {
        return <Navigate to={`/${userRole}`} replace />;
    }
    return <Outlet />;
};