import {HTMLAttributes} from "react";
import {Tabs} from "@chakra-ui/react";
import React from "react";

type MessagesContainerProps = {}
& HTMLAttributes<HTMLDivElement>
& React.ComponentProps<typeof Tabs>


export const MessagesContainer = (props: MessagesContainerProps) =>{
    return(
        <Tabs
            display={'flex'}
            w={'100%'}
            h={'100%'}
            flex={'1'}
            gap={'6'}
            variant={'enclosed'}
            onChange={props.onChange}
        >
            {props.children}
        </Tabs>
    )
}

