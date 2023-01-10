import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import {checkAuth} from "../../api/check-auth";
import {Flex, Spinner} from "@chakra-ui/react";
import LoadingScreen from "../common/loading-screen";
import {useAuthStore} from "../../../store";

interface ProtectedRouteProps {
    allowed: string | string[];
}
export const ProtectedRoute = ({allowed}:ProtectedRouteProps): JSX.Element =>{

    const redirectPath = '/login'
    const authStore = useAuthStore();

    const isAuthed = authStore.auth;
    const userRole = authStore.role;

    const isRoleAuthed = isAuthed && (allowed.includes('any') || allowed.includes(userRole));
    console.log(isAuthed)
    if (!isAuthed) {
        return <Navigate to={redirectPath} replace />;
    }
    if (!isRoleAuthed) {
        return <Navigate to={`/${userRole}`} replace />;
    }
    return <Outlet />;
};