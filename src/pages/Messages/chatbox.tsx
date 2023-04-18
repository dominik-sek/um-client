import {HStack, IconButton, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import socket from "../../socket";
import {FiSend} from "react-icons/all";
import {useForm} from "react-hook-form";
import {Message, useUserStore} from "../../../store";
interface ChatboxProps {
    chatroom_id: number
}
export const Chatbox = (props: ChatboxProps) =>{
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const userStore = useUserStore();

    const onSubmit = (data: any) =>{
        const message = {
            content: data.message,
            chatroom_id: props.chatroom_id,
            sender_id: userStore.user.id,
            sent_at: new Date(),
            status: 'unread'
        } as Message
        socket.emit('send-message', message);
        reset();
    }
    return(
        <HStack w={'100%'}>
            <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
                <InputGroup>
                    <Input placeholder={'Type your message'} {...register("message", { required: true })}  />
                    <InputRightElement >
                        <IconButton type={'submit'} aria-label={'send message'} icon={<FiSend/>} />
                    </InputRightElement>
                </InputGroup>
            </form>

        </HStack>
    )
}