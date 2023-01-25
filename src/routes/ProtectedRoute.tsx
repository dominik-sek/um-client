import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { checkAuth } from '../api/check-auth';
import LoadingScreen from '../components/shared/loading-screen';
import { fetchUserProfile } from '../api/users';
import { useUserStore } from '../../store';

interface ProtectedRouteProps {
  allowed: string | string[];
}

export const ProtectedRoute = ({ allowed }: ProtectedRouteProps): JSX.Element => {

  const { data, isLoading, isError, error } = useQuery('checkAuth', checkAuth, {
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    return <Navigate to='/login' />;
  }

  const isAuthed = data?.auth;
  const userRole = data?.role;

  const isRoleAuthed = isAuthed && (allowed.includes('*') || allowed.includes(userRole));

  if (!isAuthed && !isLoading) {
    return <Navigate to={'/login'} replace />;
  }
  if (!isRoleAuthed) {
    return <Navigate to={`/${userRole}`} replace />;
  }

  return <Outlet />;
};