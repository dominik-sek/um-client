import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import {checkAuth} from "../../api/check-auth";
import {Flex, Spinner} from "@chakra-ui/react";

interface ProtectedRouteProps {
    allowed: string | string[];
}
export const ProtectedRoute = ({allowed}:ProtectedRouteProps): JSX.Element =>{

    const { data, isLoading, isError } = useQuery('checkAuth', checkAuth);
    const redirectPath = '/login';

    if(isLoading){
        return <Spinner />
    }
    if(isError) return <div>Something went wrong</div>;

    const isAuthed = data.auth;
    const userRole = data.role;
    const isRoleAuthed = isAuthed && (allowed.includes('any') || allowed.includes(userRole));

    //if user is authenticated, redirect to the correct page

    if (!isAuthed) {
        return <Navigate to={redirectPath} replace />;
    }
    if (!isRoleAuthed) {
        return <Navigate to={`/${userRole}`} replace />;
    }
    return <Outlet />;
};