import {HTMLAttributes} from "react";
import {Tabs} from "@chakra-ui/react";
import React from "react";

type MessagesContainerProps = {}
& HTMLAttributes<HTMLDivElement>
& React.ComponentProps<typeof Tabs>


export const MessagesContainer = (props: MessagesContainerProps, {...rest}) =>{
    return(
        <Tabs
            display={'flex'}
            maxW={'100%'}
            h={'100%'}
            gap={'6'}
            variant={'soft-rounded'}
            onChange={props.onChange}
            {...rest}
        >
            {props.children}
        </Tabs>
    )
}

