import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Login from './pages/Login';
import NavigationLayout from './layout/NavigationLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import AdminPanel from './pages/admin/AdminPanel';
import Users from './pages/admin/Users';
import StudentPanel from './pages/student/StudentPanel';
import TeacherPanel from './pages/teacher/TeacherPanel';
import Grades from './pages/Grades';
import StudentGrades from './pages/student/StudentGrades';

function App() {

  return (
    <Flex>
      {
        <Routes>

          <Route path={'/login'} element={<Login />} />

          <Route element={<ProtectedRoute allowed={['*']} />}>
            <Route path={'/logout'} element={<Logout />} />

            <Route element={<NavigationLayout />}>
              <Route path={'*'} element={<NotFound />} />

              <Route element={<ProtectedRoute allowed={['*']} />}>
                <Route path={'/'} element={<Home />} />
                <Route path={'/profile'} element={<Profile />} />
              </Route>

              <Route element={<ProtectedRoute allowed={'admin'} />}>
                <Route path={'/admin/'} element={<AdminPanel />} />
                <Route path={'/admin/users/manage/'} element={<Users />} />
                <Route path={'/admin/grades'} element={<Grades />} />

              </Route>
              <Route element={<ProtectedRoute allowed={'student'} />}>
                <Route path={'/student/'} element={<StudentPanel />} />
                <Route path={'/student/grades'} element={<StudentGrades />} />
              </Route>
              <Route element={<ProtectedRoute allowed={'teacher'} />}>
                <Route path={'/teacher/'} element={<TeacherPanel />} />
                <Route path={'/teacher/grades'} element={<Grades />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      }

    </Flex>
  );

}

export default App;
