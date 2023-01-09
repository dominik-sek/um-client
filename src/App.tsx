import {checkAuth} from "./api/check-auth";
import { useQuery } from 'react-query';
import {Flex, Spinner} from "@chakra-ui/react";
import {Outlet, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";
import Login from "./components/Pages/Login";
import NavigationLayout from "./layout/NavigationLayout";
import NotFound from "./components/Pages/NotFound";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Logout from "./components/Pages/Logout";
import Settings from "./components/Pages/Settings";

function App() {

    const { data, isLoading, isError } = useQuery('checkAuth', checkAuth);

    return(
        <Flex>
            {
                <Routes>

                    <Route path={'/login'} element={<Login />} />

                    <Route element={<NavigationLayout />}>
                        <Route path={'*'} element={<NotFound />} />
                        <Route element={<ProtectedRoute allowed={['any']} />}>
                            <Route path={'/'} element={<Home />} />
                            <Route path={'/logout'} element={<Logout />} />
                            <Route path={'/settings'} element={<Settings />} />
                            <Route path={'/profile'} element={<Profile />} />
                        </Route>

                        {/*<Route element={<ProtectedRoute allowed={['student']}/>}>*/}
                        {/*    <Route path={'/student'} element={<StudentPanel />} />*/}
                        {/*    <Route path={'/grades'} element={<Grades />} />*/}
                        {/*</Route>*/}

                        {/*<Route element={<ProtectedRoute allowed={'teacher'}/>}>*/}
                        {/*    <Route path={'/teacher'} element={<TeacherPanel />} />*/}
                        {/*    <Route path={'/grades'} element={<Grades />} />*/}
                        {/*</Route>*/}

                        {/*<Route element={<ProtectedRoute allowed={'admin'}/>}>*/}
                        {/*    <Route path={'/admin'} element={<Outlet />}>*/}
                        {/*        <Route path={'/admin/'} element={<AdminPanel />} />*/}
                        {/*        <Route path={'/admin/users/'} element={<Users />} />*/}
                        {/*    </Route>*/}
                        {/*</Route>*/}
                    </Route>

                </Routes>
            }

        </Flex>
    )

}
export default App;
