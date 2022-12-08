import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../src/pages/login';
import Sidebar from '../src/components/shared/navigation/sidebar';
import { Navbar } from './components/shared/navigation/navbar';
import Home from '../src/pages/home';
import Logout from './pages/logout';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Grades from './pages/grades';
import { ProtectedRoute } from './ProtectedRoute';
import TeacherPanel from '../src/pages/teacher/index';
import StudentPanel from '../src/pages/student/index';
import React from 'react';
import { _404 } from './pages/_404';
import { Spinner } from './components/shared/spinner/spinner';
import { useQuery } from 'react-query';
import { fetchUserRole } from './api/user/fetch-user-role';
import Users from './pages/admin/users';
import AdminPanel from './pages/admin';


function App() {
  const [isAuthed, setIsAuthed] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  const query = useQuery('userRole', fetchUserRole);

  React.useEffect(() => {
    if (query.data) {
      if (!query.data.auth) {
        navigate('/login');
      } else {
        navigate('/');
      }
      setIsAuthed(query.data.auth);
      setLoading(false);
    }
  }, [query.data]);

  return (

    <div className={'flex'}>
      {loading ? <Spinner /> :
        (
          <Routes>
            <Route path={'*'} element={<_404 />} />
            <Route path={'/login'} element={<Login />} />

            <Route element={<ProtectedRoute allowed={['any']} />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/logout'} element={<Logout />} />
              <Route path={'/settings'} element={<Settings />} />
              <Route path={'/profile'} element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute allowed={['student']}
            />}>
              <Route path={'/student'} element={<StudentPanel />} />
              <Route path={'/grades'} element={<Grades />} />
            </Route>

            <Route element={<ProtectedRoute allowed={['teacher']}
            />}>
              <Route path={'/teacher'} element={<TeacherPanel />} />
              <Route path={'/grades'} element={<Grades />} />
            </Route>

            <Route element={<ProtectedRoute allowed={['admin']} />}>
              <Route path={'/admin'} element={<Outlet />}>
                <Route path={'/admin/'} element={<AdminPanel />} />
                <Route path={'/admin/users/'} element={<Users />} />
              </Route>
            </Route>
          </Routes>
        )
      }

      {(location.pathname !== '/login' && isAuthed) &&
        <>
          <Sidebar />
          <Navbar />
        </>
      }
    </div>
  );
}

export default App;
