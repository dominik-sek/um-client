import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/Routes/ProtectedRoute';
import Login from './components/Pages/Login';
import NavigationLayout from './layout/NavigationLayout';
import NotFound from './components/Pages/NotFound';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Logout from './components/Pages/Logout';
import AdminPanel from './components/Pages/admin/AdminPanel';
import Users from './components/Pages/admin/users/Users';
import StudentPanel from './components/Pages/student/StudentPanel';
import TeacherPanel from './components/Pages/teacher/TeacherPanel';
import Grades from './components/Pages/Grades';
import StudentGrades from './components/Pages/student/StudentGrades';

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
