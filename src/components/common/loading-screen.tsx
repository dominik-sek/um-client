import {Flex, Spinner} from "@chakra-ui/react";

const LoadingScreen = () =>{
    console.log('render loading')
    return(
        <Flex
            w={'100vw'}
            h={'100vh'}
            pos={'absolute'}
            top={0}
            left={0}
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