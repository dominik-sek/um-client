import {Avatar, HStack, MenuItem, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useShortMessage} from "../../hooks/useShortMessage";

interface MessageItemProps{
    latestMessage:string;
}

export const MessageItem = (props:MessageItemProps) =>{
    const navigate = useNavigate();
    const message = useShortMessage(props.latestMessage)

    const openMessages = (messageId: number) => {
        navigate(`/messages/${messageId}`)
    }
    return(
        <MenuItem onClick={()=>openMessages(1)}>
            {/*contacts */}
            <HStack>
                <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Text>
                    {message}
                </Text>
            </HStack>

        </MenuItem>
    )
}