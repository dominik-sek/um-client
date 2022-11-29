import {Route, Routes} from "react-router-dom";
import Login from "../src/pages/login";
import Sidebar from "../src/components/shared/navigation/sidebar";
import {Navbar} from "./components/shared/navigation/navbar";
import Home from "../src/pages/home";
import { useLocation } from "react-router-dom";
import Logout from "./pages/logout";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Grades from "./pages/grades";
import {ProtectedRoute} from "./ProtectedRoute";
import AdminPanel from '../src/pages/admin/index'
import TeacherPanel from '../src/pages/teacher/index'
import StudentPanel from '../src/pages/student/index'
import React from "react";
import {useNavigate} from "react-router-dom";
import {_404} from "./pages/_404";
import {Spinner} from "./components/shared/spinner/spinner";

function App() {
    const location = useLocation();
    const isAuthed = localStorage.getItem('user') !== null;
    const role = localStorage.getItem('role')
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    //check if user is logged in at start
    React.useEffect(() => {

        if (!isAuthed) {
            //show spinner if user is not logged in
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 100)

        }
    },[])

  return (
      <div className={'flex'}>
          {loading ? <Spinner/> :
              (
                  <Routes>
                      <Route path={'*'} element={<_404 />} />
                      <Route path={'/login'} element={<Login />} />
                      <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={true} role={role}/>}>
                          <Route path={'/'} element={<Home />} />
                          <Route path={'/logout'} element={<Logout />} />
                          <Route path={'/settings'} element={<Settings />} />
                          <Route path={'/profile'} element={<Profile />} />
                      </Route>

                      <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={isAuthed && role==='student'} role={role}/>}>
                          <Route path={'/student'} element={<StudentPanel />} />
                          <Route path={'/grades'} element={<Grades />} />
                      </Route>

                      <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={isAuthed && role==='teacher'} role={role} />}>
                          <Route path={'/teacher'} element={<TeacherPanel />} />
                          <Route path={'/grades'} element={<Grades />} />
                      </Route>

                      <Route element={<ProtectedRoute isAuthed={isAuthed} isRoleAuthed={isAuthed && role==='admin'} role={role}/>}>
                          <Route path={'/admin'} element={<AdminPanel />} />
                          <Route path={'/grades'} element={<Grades />} />
                      </Route>


                  </Routes>
              )

          }


        {(location.pathname !== '/login' && isAuthed ) &&
            <>
                <Sidebar />
                <Navbar />
            </>
        }
    </div>
  )
}

export default App
