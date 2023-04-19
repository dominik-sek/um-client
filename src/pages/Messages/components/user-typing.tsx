import {Box, Flex, keyframes} from "@chakra-ui/react";
import {motion} from "framer-motion";

const animationKeyframes = keyframes`
    0% {
        transform: scale(1) translateY(0);
    }
    50% {
        transform: scale(1) translateY(-5px);
    }
    100% {
        transform: scale(1) translateY(0);
    }
`
const animation = `${animationKeyframes} 1.3s ease-in-out infinite`
const COUNT = 3;
export const UserTyping = (props:{isTyping: boolean}) =>{
    return(
        <Flex
            display={props.isTyping ? 'flex' : 'none'}
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            h={'10%'}
        >
        <Flex>
            {
                Array(COUNT).fill(0).map((_, index) => (
                    <Box
                        key={index}
                        rounded={'full'}
                        as={motion.div}
                        height='10px'
                        width='10px'
                        bgColor={'gray.500'}
                        animation={animation + ` ${index * 0.1}s`}
                    />
                ))
            }
        </Flex>

        </Flex>
    )
}