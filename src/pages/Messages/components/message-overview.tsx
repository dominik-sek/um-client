import {Avatar, Flex, Tab, Text} from "@chakra-ui/react";
import {IChatroom} from "../../../../store";
interface MessageOverviewProps {
    chatroom: IChatroom

}
export const MessageOverview = (props: MessageOverviewProps) => {
    const chatroomUsers = props.chatroom?.chatroom_user || [];
    return (
        <Tab p={'6'} gap={'2'} w={'100%'} alignItems={'center'} bgColor={'gray.800'} rounded={'md'} cursor={'pointer'} _hover={{bgColor:'gray.700'}}>
            <Avatar size={'sm'} src={chatroomUsers[0].account.account_images?.avatar_url || ''} />
            <Text>
                {chatroomUsers[0].account.person.first_name} {chatroomUsers[0].account.person.last_name}
            </Text>
        </Tab>
    )
}