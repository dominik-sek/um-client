import {Flex, useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useAuthStore, useUserStore} from "../../../store";
import {useQuery} from "react-query";
import {logoutUser} from "../../api/logout-user";
import {useEffect} from "react";

const Logout = () => {

    const navigate = useNavigate();
    const userAuth = useAuthStore();
    const userStore = useUserStore();
    const toast = useToast();
    const {refetch, isLoading} = useQuery('logoutUser', () => logoutUser(), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        refetch().then(() => {
                userAuth.logout();
                userStore.clearUser();
                navigate('/login')
            }
        )
    }, [])


    return (
        <Flex>
        </Flex>
    );

};
export default Logout;