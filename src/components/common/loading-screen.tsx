import {Flex, Spinner} from "@chakra-ui/react";

const LoadingScreen = () =>{
    return(
        <Flex
            w={'100%'}
            h={'100%'}
            pos={'absolute'}
            bg={'blackAlpha.800'}
            zIndex={'100'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Spinner size={'xl'} />
        </Flex>
    )
}
export default LoadingScreen;