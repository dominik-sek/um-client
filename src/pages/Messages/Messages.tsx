import {Outlet, useLocation} from "react-router-dom";
import {Box, Flex, IconButton, TabPanels, useMediaQuery, VStack, Wrap} from "@chakra-ui/react";
import {MessageOverview} from "./components/message-overview";
import {AddIcon} from "@chakra-ui/icons";
import {MessagesContainer} from "./components/messages-container";
import {useState} from "react";

export const Messages = () =>{

    const [isLargerThanMedium] = useMediaQuery('(min-width: 768px)');
    return (
        //TODO: remove the magic number 115px
        <Flex gap={'6'} h={'calc(100vh - 115px)'} >
            <MessagesContainer>
                <VStack h={'100%'} w={!isLargerThanMedium && '100%'}>
                    <MessageOverview />
                    <MessageOverview />
                    <IconButton w={'100%'} aria-label={'new message'} size={'lg'} rounded={'md'} icon={<AddIcon/>} />
                </VStack>

                <VStack display={isLargerThanMedium ? 'block' : 'none'} w={'100%'} flex={'1'} h={'100%'}>
                    <TabPanels h={'100%'}>
                        <Outlet />
                    </TabPanels>
                </VStack>

            </MessagesContainer>
        </Flex>
    )
}
export default Messages