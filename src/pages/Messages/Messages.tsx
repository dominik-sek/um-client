import {
    Flex,
    IconButton,
    TabPanels,
    useMediaQuery,
    VStack,
    Text,
    Button,
    Divider, InputRightElement, useDisclosure, Box, HStack, Container, useColorModeValue, TabPanel
} from "@chakra-ui/react";
import {MessageOverview} from "./components/message-overview";
import {AddIcon, ArrowBackIcon} from "@chakra-ui/icons";
import {MessagesContainer} from "./components/messages-container";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Chatroom} from "./Chatroom";
import useSocket from "../../hooks/useSocket";
import AutocompleteSearchbar from "../../components/shared/search/autocomplete-searchbar";
import {useQuery} from "react-query";
import {fetchAllUsers} from "../../api/users";
import {useChatroomStore, useNotifStore, useUserStore} from "../../../store";
import socket from "../../socket";
import React from "react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";

export const Messages = () =>{
    const {data: userList, refetch} = useQuery('fetchAllUsers',fetchAllUsers,{
        refetchOnWindowFocus: false,
        enabled:true
    });
    const { t } = useTranslation();
    const currentUser = useUserStore((state) => state.user);
    const [isLargerThanMedium] = useMediaQuery('(min-width: 48em)');
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [chatrooms, setChatrooms] = useState(useChatroomStore((state) => state.chatrooms));
    const [wereMessagesRefreshed, setWereMessagesRefreshed] = useState(false);
    const [userTyping, setUserTyping] = useState({
        chatroomId: -1,
        senderId: -1,
        isTyping: false
    });
    const [chatroomVisible, setChatroomVisible] = useState(false);
    const dividerColor = useColorModeValue('gray.400', 'gray.700');

    useEffect(() => {
        const unsubscribe = useChatroomStore.subscribe((newState) => {
            setChatrooms(newState.chatrooms);
        });


        return () => {
            unsubscribe();
        };
    }, [chatrooms]);

    useMemo(()=>{
        socket.on("user-typing",({chatroomId, senderId, isTyping})=>{
            console.log(`SOCKET: user ${senderId} is typing inside ${chatroomId}...? ${isTyping}`)
            setUserTyping({chatroomId, senderId, isTyping})
        })
    },[])

    const generateUserSuggestions = useMemo(()=>{
        return () =>{
            return userList?.filter((user: any) => user.id !== currentUser.id && !chatrooms.find((chatroom: any) => chatroom.recipient === user.id));
        }
    },[chatrooms, currentUser.id, userList])

    const toggleSearchbar = useMemo(()=>{
        return () =>{
            setShowSearchbar(!showSearchbar);
        }
    },[showSearchbar])

    const handleCreateChatroom = useMemo(()=>{
        return (suggestion: string | {id: number, first_name: string, last_name: string}) => {
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
    },[currentUser.id])

    socket.on('new-message', () => {
        console.log('MESSAGES.TSX/SOCKET: got new message, setting state to false')
        setWereMessagesRefreshed(false);
    });

    const handleMessagesUpdate = (chatroomId: number)=> {
        if(wereMessagesRefreshed) return;
        const chatroom = chatrooms.find((chatroom: any) => chatroom.id === chatroomId);
        console.log('MESSAGES.TSX/SOCKET: refreshing messages inside Messages.tsx')
        setWereMessagesRefreshed(true);
        socket.emit('seen-messages', chatroom);
    }

    const handleExitChatroom = () =>{
        !isLargerThanMedium &&
        setChatroomVisible(!chatroomVisible);
    }
    const handleDeleteChatroom = (chatroomId: number) =>{
        setChatroomVisible(!chatroomVisible);
        socket.emit('delete-chatroom', chatroomId);
    }
    return (
        <Flex gap={'6'}
              h={'calc(100vh - 115px)'}
              w={'100%'}
              alignItems={'center'}
              overflow={'hidden'}
        >
            {/*tabs*/}

            <Box maxW={'100%'} h={'100%'} w={'100%'}>
                <MessagesContainer>
                    <VStack h={'100%'}
                            minW={!isLargerThanMedium ? '100%' : '30%'}
                            id={'chatrooms'}
                            display={!isLargerThanMedium && chatroomVisible ? 'none' : 'flex'}
                    >
                        {
                            chatrooms.map((chatroom) => {
                                return <MessageOverview key={chatroom.id}
                                                        chatroom={chatroom}
                                                        value={chatroom.id}
                                                        onClick={()=>{handleMessagesUpdate(chatroom.id); handleExitChatroom()}}
                                />
                            })
                        }
                        {
                            chatrooms.length === 0 &&
                            <Text fontSize={'xl'} color={'gray.500'}>{t('messenger.noChatrooms')}</Text>
                        }
                        {showSearchbar ? (
                            <Flex w={'100%'} h={'100%'}>
                                <AutocompleteSearchbar
                                    suggestions={generateUserSuggestions()}
                                    onSuggestionSelected={(suggestion)=>handleCreateChatroom(suggestion)}
                                    w={'100%'}
                                    searchPlaceholder={t('messenger.searchUser') as string}
                                >
                                    <InputRightElement>
                                        <IconButton
                                            aria-label={'cancel search'}
                                            colorScheme={'blue'}
                                            icon={<ArrowBackIcon  />}
                                            onClick={toggleSearchbar}
                                        />
                                    </InputRightElement>
                                </AutocompleteSearchbar>
                            </Flex>
                        ) : (
                            <Button
                                onClick={toggleSearchbar}
                                colorScheme={'blue'}
                                w={'100%'}
                                leftIcon={<AddIcon />}
                            >
                                {t('messenger.newMessage')}
                            </Button>
                        )}

                    </VStack>

                    <Divider borderColor={dividerColor} orientation={'vertical'} display={isLargerThanMedium ? 'block' : 'none'} />

                    <VStack
                        h={'100%'}
                        w={!isLargerThanMedium ? '100%' : '70%'}
                        display={!isLargerThanMedium && !chatroomVisible ? 'none' : 'flex'}
                        id={'chatroom'}
                    >
                        <TabPanels h={'100%'}>
                            {chatrooms.length === 0 &&
                                (
                                    <TabPanel as={Flex} justify={'center'}>
                                        <Text fontSize={'xl'} color={'gray.500'}>
                                            {t('messenger.nothingHere')}
                                        </Text>
                                    </TabPanel>
                                )
                            }
                            {
                                chatrooms.map((chatroom) => {
                                    const isUserTyping = userTyping.chatroomId === chatroom.id && userTyping.senderId !== currentUser.id && userTyping.isTyping
                                    return(

                                        <Chatroom isTyping={isUserTyping}
                                                  key={chatroom.id}
                                                  onExitChatroom={handleExitChatroom}
                                                  onDeleteChatroom={()=>handleDeleteChatroom(chatroom.id)}
                                                  onClick={()=>{handleMessagesUpdate(chatroom.id)}}
                                                  backButtonVisible={!isLargerThanMedium}
                                                  chatroom={chatroom} />

                                    )
                                })
                            }

                        </TabPanels>
                    </VStack>
                </MessagesContainer>
            </Box>

        </Flex>
    )
}

export default Messages;
