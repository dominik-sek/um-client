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
    console.log("auth: ",data, isLoading, isError);

    if(isLoading){
        return <Spinner />
    }
    if(isError) return <div>Something went wrong</div>;

    const isAuthed = data.auth;
    const userRole = data.role;
    const isRoleAuthed = isAuthed && (allowed.includes('any') || allowed.includes(userRole));
    console.log("auth: ",isAuthed, userRole, isRoleAuthed);

    if (!isAuthed) {
        return <Navigate to={redirectPath} replace />;
    }
    if (!isRoleAuthed) {
        return <Navigate to={`/${userRole}`} replace />;
    }
    return <Outlet />;
};