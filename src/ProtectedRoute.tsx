import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchUserRole } from './api/user/fetch-user-role';

export const ProtectedRoute = ({ redirectPath = '/login' }, allowed: any[]) => {

  const query = useQuery('userRole', fetchUserRole, {
    refetchOnMount: true,
    retry: failureCount => {
      return failureCount < 3;
    },
  });

  const isAuthed = !!query.data.auth;
  const userRole = query.data.role;
  const isRoleAuthed = isAuthed && (allowed.includes('any') || allowed.includes(userRole));

  if (!isAuthed) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!isRoleAuthed) {
    return <Navigate to={`/${userRole}`} replace />;
  }
  return <Outlet />;
};
