import {useQuery} from "react-query";
import LoadingScreen from "../../../shared/loading-screen";
import {fetchAllUsers} from "../../../../api/fetch-all-users";
import UserCard from "../../../shared/user-card";
import {Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, Wrap} from "@chakra-ui/react";
import {AddIcon, SearchIcon} from "@chakra-ui/icons";
import {motion, useAnimation, useInView} from "framer-motion";
import React, {useRef} from "react";

const Users = (): JSX.Element => {
    const [newUserModal, setNewUserModal] = React.useState(false);
    const {data, isLoading, isError, error} = useQuery('users', fetchAllUsers, {
        refetchOnWindowFocus: false
    });
    if (isLoading) {
        return <LoadingScreen/>
    }
    if (isError) {
        console.log('error', error)
    }
    const ref = useRef(null)
    const isInView = useInView(ref)
    const controls = useAnimation();


    return (
        <Flex flexDir={'column'} gap={10}>
            <Box
                w={'full'}
                p={4}
                bg={''}
                display={'flex'}
                flexDir={{base: 'column', md: 'row'}}
                gap={{base: 4, md: 10}}
                justifyContent={{base: 'center', md: 'space-between'}}
                alignItems={{base: 'center', md: 'flex-start'}}
            >
                <Wrap minW={'40%'}>
                    <InputGroup>
                        <InputLeftElement children={<SearchIcon/>
                        }/>
                        <Input placeholder={'Search'}/>
                    </InputGroup>
                </Wrap>

                <motion.div
                    ref={ref}
                    animate={controls}
                >
                    <Button id={'add-user-btn'} leftIcon={<AddIcon/>} colorScheme={'whatsapp'}
                            onClick={() => setNewUserModal(true)}>
                        <Text>
                            Add new user
                        </Text>
                    </Button>
                </motion.div>

            </Box>
            <Wrap spacing={8} w={'100%'} h={'100%'} align={'center'} justify={'space-around'}>

                {
                    data.map((user: any) => {
                        return (
                            <motion.div
                                whileInView={{opacity: 1}}
                                initial={{opacity: 0}}
                            >
                                <UserCard user={user} key={user.id}/>
                            </motion.div>
                        )
                    })

                }

            </Wrap>
        </Flex>
    )
}
export default Users;