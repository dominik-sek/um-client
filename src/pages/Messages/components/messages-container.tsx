import {HTMLAttributes} from "react";
import {Flex, TabList, TabPanels, Tabs} from "@chakra-ui/react";

interface MessagesContainerProps extends HTMLAttributes<HTMLDivElement>{}
export const MessagesContainer = (props: MessagesContainerProps) =>{
    return(
        <Tabs
            display={'flex'}
            w={'100%'}
            h={'100%'}
            flex={'1'}
            gap={'6'}
        >
            {props.children}
        </Tabs>
    )
}

