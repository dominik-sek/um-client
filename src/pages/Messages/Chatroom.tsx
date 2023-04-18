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
import {useParams} from "react-router-dom";
import {Chatbox} from "./chatbox";
import {Message, useMessageStore, useUserStore} from "../../../store";

export const Chatroom = () =>{
    const {id} = useParams<{id:string}>();
    const userId = useUserStore((state) => state.user.id);
    const messages = useMessageStore((state) => state.messages);

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
        >

            <Flex width={'100%'} p={'2'} alignItems={'center'} gap={'4'}>
                <Avatar> </Avatar>
                <Heading size={'md'}>Name surname</Heading>
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
                            <Flex key={message.id}
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

            <Chatbox />


        </TabPanel>
    )
}