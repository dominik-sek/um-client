import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './middleware/ProtectedRoute';
import Login from './pages/Login';
import NavigationLayout from './layout/NavigationLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import AdminPanel from './pages/admin/AdminPanel';
import Users from './pages/admin/users/Users';
import StudentPanel from './pages/student/StudentPanel';
import TeacherPanel from './pages/teacher/TeacherPanel';
import Grades from './pages/Grades';
import StudentGrades from './pages/student/StudentGrades';
import Faculties from './pages/admin/faculties/Faculties';
import Departments from './pages/admin/departments/Departments';
import Courses from './pages/admin/courses/Courses';
import Timetables from './pages/admin/departments/Timetables';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import Printouts from './pages/printouts/Printouts';

function App() {
	return (
		<Flex>
			{
				<Routes>
					{/* /reset-password/:token */}
					<Route
						path={'/reset-password/:token'}
						element={<ResetPassword />}
					/>

					<Route path={'/login'} element={<Login />} />
					<Route
						path={'/forgot-password'}
						element={<ForgotPassword />}
					/>

					<Route element={<ProtectedRoute allowed={['*']} />}>
						<Route path={'/logout'} element={<Logout />} />

						<Route element={<NavigationLayout />}>
							<Route path={'*'} element={<NotFound />} />

							<Route element={<ProtectedRoute allowed={['*']} />}>
								<Route path={'/'} element={<Home />} />
								<Route
									path={'/profile'}
									element={<Profile />}
								/>
							</Route>
							<Route
								element={<ProtectedRoute allowed={'admin'} />}>
								<Route
									path={'/admin/'}
									element={<AdminPanel />}
								/>
								<Route
									path={'/admin/grades'}
									element={<Grades />}
								/>
								<Route
									path={'/admin/users/manage/'}
									element={<Users />}
								/>
								<Route
									path={'/admin/faculties/manage/'}
									element={<Faculties />}
								/>
								<Route
									path={'/admin/departments/manage/'}
									element={<Departments />}
								/>
								<Route
									path={
										'/admin/departments/timetables/manage/'
									}
									element={<Timetables />}
								/>
								<Route
									path={'/admin/courses/manage/'}
									element={<Courses />}
								/>
								<Route
									path={'/admin/printouts/manage/'}
									element={<Printouts />}
								/>
							</Route>
							<Route
								element={
									<ProtectedRoute allowed={'student'} />
								}>
								<Route
									path={'/student/'}
									element={<StudentPanel />}
								/>
								<Route
									path={'/student/grades'}
									element={<StudentGrades />}
								/>
								<Route
									path={'/student/printouts'}
									element={<Printouts />}
								/>

							</Route>
							<Route
								element={
									<ProtectedRoute allowed={'teacher'} />
								}>
								<Route
									path={'/teacher/'}
									element={<TeacherPanel />}
								/>
								<Route
									path={'/teacher/grades'}
									element={<Grades />}
								/>
								<Route
									path={'/teacher/documents/printouts/manage'}
									element={<Printouts />}
								/>
								<Route
									path={'/teacher/printouts'}
									element={<Printouts />}
								/>

							</Route>
						</Route>
					</Route>
				</Routes>
			}
		</Flex>
	);
}

export default App;
