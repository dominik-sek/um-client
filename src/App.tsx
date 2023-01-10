import {checkAuth} from "./api/check-auth";
import { useQuery } from 'react-query';
import {Flex, Spinner} from "@chakra-ui/react";
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";
import Login from "./components/Pages/Login";
import NavigationLayout from "./layout/NavigationLayout";
import NotFound from "./components/Pages/NotFound";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Logout from "./components/Pages/Logout";
import Settings from "./components/Pages/Settings";
import {useEffect} from "react";
import LoadingScreen from "./components/common/loading-screen";
import {useAuthStore, useUserStore} from '../store';
import {fetchUserProfile} from "./api/fetch-user-profile";


function App() {

    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery('checkAuth', checkAuth,{
        refetchOnWindowFocus: false
    })


    const setAuth = useAuthStore(state => state.setAuth);
    const setRole = useAuthStore(state => state.setRole);

    useEffect(() => {
        if(data) {
            if(data.auth){
                setAuth(data.auth);
                setRole(data.role);
                navigate('/')
            }else{
                setAuth(false);
                setRole('');
                navigate('/login');
            }
        }

    }, [data, setAuth, setRole ])


    return(
        <Flex>
            {isLoading ? <LoadingScreen /> : null}
            {
                <Routes>
                    <Route path={'/login'} element={<Login />} />

                    <Route element={<ProtectedRoute allowed={['any']} />}>

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
                    </Route>
                </Routes>
            }

        </Flex>
    )

}
export default App;
