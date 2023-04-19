import {
    Avatar, Box,
    Divider,
    Flex,
    Heading, IconButton,
    Input,
    InputGroup,
    InputRightElement, TabPanel, TabPanels,
    Text
} from "@chakra-ui/react";
import {Chatbox} from "./chatbox";
import {IChatroom, Message, useUserStore} from "../../../store";
import {UserTyping} from "./components/user-typing";

interface ChatroomProps extends React.ComponentProps<typeof TabPanel> {
    chatroom: IChatroom;
};

export const Chatroom = (props: ChatroomProps, {...rest}) =>{

    const userId = useUserStore((state) => state.user.id);
    const chatroomUsers = props.chatroom.chatroom_user;
    const chatroomId = props.chatroom.id;
    const messages = props.chatroom.message;

    return(
        <TabPanel
            display={'flex'}
            flexDir={'column'}
            rounded={'md'}
            borderColor={'slate'}
            borderWidth={'1px'}
            h={'100%'}
            minW={'100%'}
            overflowY={'auto'}
            onClick={props.onClick}
            {...rest}
        >

            <Flex width={'100%'} p={'2'} alignItems={'center'} gap={'4'}>
                <Avatar size={'md'} src={chatroomUsers[0].account.account_images?.avatar_url || ''} />
                <Heading size={'md'}>
                    {chatroomUsers[0].account.person.first_name} {chatroomUsers[0].account.person.last_name}
                </Heading>
            </Flex>

            <Divider />

            <Flex flex={'1'}
                  flexDir={'column-reverse'}
                  p={'6'}
                  gap={'4'}
                  overflowY={'scroll'}
            >
                {
                    messages && messages.reverse().map((message:Message) => {
                        const isSender = message.sender_id === userId;
                        const border = isSender ? 'borderBottomRightRadius' : 'borderBottomLeftRadius';
                        const borderRadiusStyle = {[border]: '0'};
                        const time = new Date(message.sent_at).toLocaleTimeString()
                        const date = new Date(message.sent_at).toLocaleDateString()
                        return (
                            <Flex key={message.content.slice(0, 5) + message.sent_at}
                                  alignItems={isSender ? 'flex-end' : 'flex-start'}
                                  flexDir={'column'}
                            >
                                <Box bgColor={isSender ? 'blue.700' : 'green.700'}
                                     px={'4'} py={'2'}
                                     width={{base: '100% !important', md: '50% !important'}}

                                     rounded={'xl'} display={'flex'} flexDir={'column'} gap={'2'} {...borderRadiusStyle}>
                                    <Text fontSize={'md'}>{message.content}</Text>
                                    <Text fontSize={'xs'}>{time} {date}</Text>
                                </Box>
                            </Flex>
                        )
                    })
                }

            </Flex>
                <UserTyping isTyping={false} />
            <Chatbox chatroomId={chatroomId} />


        </TabPanel>
    )
}