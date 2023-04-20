import {Avatar, Badge, Box, Flex, Tab, Text} from "@chakra-ui/react";
import {IChatroom} from "../../../../store";
import React from "react";

interface MessageOverviewProps extends React.ComponentProps<typeof Tab>{
    chatroom: IChatroom;
}

export const MessageOverview = (props: MessageOverviewProps) => {
    const chatroomUsers = props.chatroom?.chatroom_user || [];
    const latestMessage = props.chatroom?.message[0]?.content || '';
    const latestMessageShort = latestMessage.length > 20 ? latestMessage.substring(0, 20) + '...' : latestMessage;


    return (
        <Tab position={'relative'} onClick={props.onClick} onLoad={props.onLoad} value={props.chatroom.id} p={'6'} gap={'2'} w={'100%'} alignItems={'center'} bgColor={'gray.800'} rounded={'md'} cursor={'pointer'} _hover={{bgColor:'gray.700'}}>
            {/*<Badge position={'absolute'} top={'0'} right={'0'} colorScheme={'red'}>{unreadCount}</Badge>*/}

            <Flex flexDir={'column'}>
            <Box>
                <Avatar size={'sm'} src={chatroomUsers[0].account.account_images?.avatar_url || ''} />
                <Text >
                    {chatroomUsers[0].account.person.first_name} {chatroomUsers[0].account.person.last_name}
                </Text>
            </Box>
                <Text fontSize={'xs'} color={'gray.400'} >
                    {latestMessageShort}
                </Text>

            </Flex>
        </Tab>
    )
}