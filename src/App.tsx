import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../src/pages/login';
import Sidebar from '../src/components/shared/navigation/sidebar';
import { Navbar } from './components/shared/navigation/navbar';
import Home from '../src/pages/home';
import Logout from './pages/logout';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Grades from './pages/grades';
import { ProtectedRoute } from './ProtectedRoute';
import AdminPanel from '../src/pages/admin/index';
import TeacherPanel from '../src/pages/teacher/index';
import StudentPanel from '../src/pages/student/index';
import React from 'react';
import { _404 } from './pages/_404';
import { Spinner } from './components/shared/spinner/spinner';
import { useQuery } from 'react-query';
import { fetchUserRole } from './api/user/fetch-user-role';


function App() {
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [role, setRole] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  const query = useQuery('userRole', fetchUserRole);
  React.useEffect(() => {
    if (query.data) {
      setRole(query.data.role);
      setIsAuthed(query.data.auth);
      setLoading(query.isLoading);
      //if the user is not authed, redirect to login page
      if (!query.data.auth) {
        console.log('not authed');
        navigate('/login');
      } else {
        console.log('user is authed');
        //if the user is authed, redirect to the home page
        navigate('/');
      }

    }
  }, [query.data]);

  return (

    <div className={'flex'}>
      {loading ? <Spinner /> :
        (
          <Routes>
            <Route path={'*'} element={<_404 />} />
            <Route path={'/login'} element={<Login />} />
            <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={true} role={role} />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/logout'} element={<Logout />} />
              <Route path={'/settings'} element={<Settings />} />
              <Route path={'/profile'} element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={isAuthed && role === 'student'}
                                            role={role} />}>
              <Route path={'/student'} element={<StudentPanel />} />
              <Route path={'/grades'} element={<Grades />} />
            </Route>

            <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={isAuthed && role === 'teacher'}
                                            role={role} />}>
              <Route path={'/teacher'} element={<TeacherPanel />} />
              <Route path={'/grades'} element={<Grades />} />
            </Route>

            <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={isAuthed && role === 'admin'}
                                            role={role} />}>
              <Route path={'/admin'} element={<AdminPanel />} />
              <Route path={'/grades'} element={<Grades />} />
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
