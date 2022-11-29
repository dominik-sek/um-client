import {Navigate, Outlet} from "react-router-dom";

// @ts-ignore
export const ProtectedRoute = ({isAuthed, redirectPath = '/login',isRoleAuthed, role}) => {

    if (!isAuthed) {
        return <Navigate to={redirectPath} replace />
    }
    if(!isRoleAuthed){
        return <Navigate to={`/${role}`} replace />
    }
    return <Outlet />
};
