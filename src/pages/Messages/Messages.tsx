import {
    Flex,
    IconButton,
    TabPanels,
    useMediaQuery,
    VStack,
    Text,
    Button,
    Divider, InputRightElement, Icon
} from "@chakra-ui/react";
import {MessageOverview} from "./components/message-overview";
import {AddIcon, ArrowBackIcon} from "@chakra-ui/icons";
import {MessagesContainer} from "./components/messages-container";
import {useState} from "react";
import {Chatroom} from "./Chatroom";
import useSocket from "../../hooks/useSocket";
import AutocompleteSearchbar from "../../components/shared/search/autocomplete-searchbar";
import {useQuery} from "react-query";
import {fetchAllUsers} from "../../api/users";
import {useChatroomStore, useUserStore} from "../../../store";
import socket from "../../socket";

export const Messages = () =>{
    useSocket();
    const {data: userList, refetch} = useQuery('fetchAllUsers',fetchAllUsers,{
        refetchOnWindowFocus: false,
        enabled:true
    });
    const currentUser = useUserStore((state) => state.user);
    const [isLargerThanMedium] = useMediaQuery('(min-width: 768px)');
    const [showSearchbar, setShowSearchbar] = useState(false);

    const chatrooms = useChatroomStore((state) => state.chatrooms);
    //watch for new chatrooms
    const generateUserSuggestions = () =>{
        //filter out current user and users that are already in chatrooms
        return userList?.filter((user: any) => user.id !== currentUser.id && !chatrooms.find((chatroom: any) => chatroom.recipient === user.id));
    }
    const toggleSearchbar = () =>{
        setShowSearchbar(!showSearchbar);
    }
    const handleCreateChatroom = (suggestion: string | {id: number, first_name: string, last_name: string}) => {
        if (typeof suggestion === 'string') return;
        const chatroom = {
            created_by: currentUser.id,
            recipient: suggestion.id,
            created_at: new Date(),
            lastActivity: new Date()
        }
        socket.emit('create-chatroom', chatroom);
        setShowSearchbar(false);
    }


    return (

        <Flex gap={'6'} h={'calc(100vh - 115px)'} >
            {/*tabs*/}
            <MessagesContainer>
                <VStack h={'100%'} minW={'35%'} w={!isLargerThanMedium && '100%'}>
                    {
                        chatrooms.map((chatroom) => {
                            return <MessageOverview key={chatroom.id} chatroom={chatroom} />
                        })
                    }
                    {
                        chatrooms.length === 0 &&
                        <Text fontSize={'xl'} color={'gray.500'}>No messages yet</Text>
                    }
                    {showSearchbar ? (
                        <Flex w={'100%'} h={'100%'}>
                            <AutocompleteSearchbar
                                suggestions={generateUserSuggestions()}
                                onSuggestionSelected={(suggestion)=>handleCreateChatroom(suggestion)}
                                // onBlur={toggleSearchbar}
                                w={'100%'}
                                searchPlaceholder={'Search for users'}
                            >
                                <InputRightElement>
                                    <IconButton
                                        aria-label={'cancel search'}
                                        icon={<ArrowBackIcon />}
                                        onClick={toggleSearchbar}
                                    />
                                </InputRightElement>
                            </AutocompleteSearchbar>
                        </Flex>
                    ) : (
                        <Button
                            onClick={toggleSearchbar}
                            w={'100%'}
                            leftIcon={<AddIcon />}
                        >
                            Compose a message
                        </Button>
                    )}

                </VStack>
                <Divider orientation={'vertical'} display={isLargerThanMedium ? 'block' : 'none'} />
                <VStack display={isLargerThanMedium ? 'block' : 'none'} w={'100%'} flex={'1'} h={'100%'}>
                    <TabPanels h={'100%'}>
                        {
                            chatrooms.map((chatroom) => {
                                return <Chatroom key={chatroom.id} chatroom={chatroom} />
                            })
                        }

                    </TabPanels>
                </VStack>
            </MessagesContainer>

        </Flex>
    )
}
export default Messages