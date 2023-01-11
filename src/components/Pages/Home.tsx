import LoadingScreen from "../common/loading-screen";
import {useAuthStore} from "../../../store";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {

    //check role then redirect
    const useAuth = useAuthStore();
    const role = useAuth.role;
    const navigate = useNavigate();
    useEffect(() => {
        if (role) {
            navigate(`/${role}`)
        }
    }, [role])

    return (
        <LoadingScreen/>
    )


}
export default Home;