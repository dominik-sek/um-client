import {HStack, IconButton, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import socket from "../../socket";
import {FiSend} from "react-icons/all";
import {useForm} from "react-hook-form";
import {Message, useUserStore} from "../../../store";
import {v4} from "uuid";

export const Chatbox = () =>{
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const userStore = useUserStore();

    const onSubmit = (data: any) =>{
        const message = {
            id: v4(),
            content: data.message,
            sender_id: userStore.user.id,
            sent_at: new Date()
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