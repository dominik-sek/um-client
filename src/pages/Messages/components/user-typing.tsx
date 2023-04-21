import {Box, Flex, keyframes, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";

const animationKeyframes = keyframes`
    0% {
        transform: scale(1) translateY(0);
    }
    50% {
        transform: scale(1) translateY(-7px);
    }
    100% {
        transform: scale(1) translateY(0);
    }
`
const animation = `${animationKeyframes} 1s ease-in-out infinite`
const COUNT = 3;
const DOT_SIZE = 11;
export const UserTyping = (props:{isTyping: boolean}) =>{
    return(
        <Flex
            display={props.isTyping ? 'flex' : 'none'}
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            h={'auto'}
            py={'2'}
            gap={'2'}
        >

            <Flex>
                {
                    Array(COUNT).fill(0).map((_, index) => (
                        <Box
                            key={index}
                            rounded={'full'}
                            as={motion.div}
                            height={`${DOT_SIZE}px`}
                            width={`${DOT_SIZE}px`}
                            bgColor={'gray.500'}
                            animation={animation + ` ${index * 0.1}s`}
                        >

                        </Box>
                    ))
                }
            </Flex>

        </Flex>
    )
}