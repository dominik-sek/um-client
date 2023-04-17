import LoadingScreen from '../components/shared/loading-screen';
import { useAuthStore, useUserStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSocket from "../hooks/useSocket";


const Home = () => {
	//check role then redirect
	const useAuth = useAuthStore();
	const role = useAuth.role;
	const user = useUserStore((state) => state.user);
	const navigate = useNavigate();

	//TODO: change place of socket connection, maybe connect on login
	useSocket();

	useEffect(() => {
		if (role && user) {
			navigate(`/${role}`);
		}
	}, [role]);

	return <LoadingScreen />;
};
export default Home;
