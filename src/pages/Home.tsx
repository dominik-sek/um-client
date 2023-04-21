import { useAuthStore, useUserStore } from '../../store';
import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

const Home = () => {
	const useAuth = useAuthStore();
	const role = useAuth.role;
	const user = useUserStore((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (role && user) {
			navigate(`/${role}`);
		}
	}, [navigate, role, user]);

	return <Outlet/>
};
export default Home;
