import {
    Avatar, Box,
    Divider,
    Flex,
    Heading, Icon, IconButton,
    Input,
    InputGroup,
    InputRightElement, TabPanel, TabPanels,
    Text, Tooltip
} from "@chakra-ui/react";
import {Chatbox} from "./chatbox";
import {IChatroom, Message, useUserStore} from "../../../store";
import {UserTyping} from "./components/user-typing";
import {CheckIcon} from "@chakra-ui/icons";

interface ChatroomProps extends React.ComponentProps<typeof TabPanel> {
    chatroom: IChatroom;
};

export const Chatroom = (props: ChatroomProps, {...rest}) =>{

    const userId = useUserStore((state) => state.user.id);
    const chatroomUsers = props.chatroom.chatroom_user;
    const chatroomId = props.chatroom.id;
    const messages = props.chatroom.message;
    const latestMessage = messages[messages.length - 1];

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
                  gap={'1'}
                  overflowY={'scroll'}
                  position={'relative'}
            >
                {
                    messages && messages.reverse().map((message:Message) => {
                        const isSender = message.sender_id === userId;
                        const border = isSender ? 'borderBottomRightRadius' : 'borderBottomLeftRadius';
                        const borderRadiusStyle = {[border]: '0'};
                        const time = new Date(message.sent_at).toLocaleTimeString()
                        const date = new Date(message.sent_at).toLocaleDateString()
                        const messageStatus = message.status;
                        const recipient = chatroomUsers.find((user) => user.user_id !== userId);
                        console.log(latestMessage.id)
                        return (
                            <Flex key={message.id}
                                  alignItems={isSender ? 'flex-end' : 'flex-start'}
                                  justifyContent={isSender ? 'flex-end' : 'flex-start'}
                                  gap={'2'}

                            >
                            <Tooltip label={messageStatus + message.id + ' ' + latestMessage.id} >
                                    <Box bgColor={isSender ? 'blue.700' : 'green.700'}
                                         border={latestMessage.id === message.id ? '1px solid red' : 'none'}
                                         px={'4'} py={'2'}
                                         maxWidth={{base: '100% !important', md: '50% !important'}}

                                         rounded={'xl'} display={'flex'} flexDir={'column'} gap={'2'} {...borderRadiusStyle}>
                                        <Text fontSize={'md'}>{message.content}</Text>
                                        <Text fontSize={'xs'}>{time} {date}</Text>
                                    </Box>
                            </Tooltip>
                                    <Flex display={'block'}>

                                        {
                                            isSender && messageStatus === 'sent' &&
                                            <Tooltip label={'Message sent'} hasArrow placement={'bottom-end'} aria-label={'Message sent'}>
                                                <Avatar as={CheckIcon} size={'2xs'} bgColor={'transparent'} color={'green.500'} />
                                            </Tooltip>

                                        }
                                        {
                                            isSender && messageStatus === 'read' && message.id === latestMessage.id &&
                                            <Tooltip label={`${recipient?.account.person.first_name} ${recipient?.account.person.last_name}`} hasArrow placement={'bottom-end'} aria-label={'Message sent'}>
                                                <Avatar size={'2xs'} src={recipient?.account.account_images?.avatar_url || ''} />
                                            </Tooltip>

                                        }

                                    </Flex>
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