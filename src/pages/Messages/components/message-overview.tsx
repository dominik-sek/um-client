import {Avatar, Badge, Box, Flex, Tab, Text, useColorModeValue} from "@chakra-ui/react";
import {IChatroom} from "../../../../store";
import React from "react";

interface MessageOverviewProps extends React.ComponentProps<typeof Tab>{
    chatroom: IChatroom;
    unread: number;
}

export const MessageOverview = (props: MessageOverviewProps,{...rest}) => {
    const chatroomUsers = props.chatroom?.chatroom_user || [];
    const latestMessage = props.chatroom?.message[0] || '';
    const latestMessageShort = latestMessage.content.length > 20 ? latestMessage.content.substring(0, 20) + '...' : latestMessage.content;
    const bgColor = useColorModeValue('gray.300', 'gray.800');

    return (
        <Tab position={'relative'} onClick={props.onClick} onLoad={props.onLoad} value={props.chatroom.id} p={'6'}
             gap={'2'} w={'100%'} alignItems={'center'} bgColor={bgColor} rounded={'md'} cursor={'pointer'}
             _hover={{bgColor:'gray.700'}} {...rest}>

            {/*<Badge position={'absolute'} top={'0'} right={'0'} colorScheme={'red'}>{unreadCount}</Badge>*/}
            <Flex flexDir={'column'}>
            <Box>
                <Avatar size={'sm'} src={chatroomUsers[0].account.account_images?.avatar_url || ''} />
                <Text >
                    {chatroomUsers[0].account.person.first_name} {chatroomUsers[0].account.person.last_name}
                </Text>
            </Box>
                <Text fontSize={'xs'} >
                    {latestMessageShort}
                </Text>


            </Flex>
        </Tab>
    )
}