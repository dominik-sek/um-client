import {Avatar, Flex, Tab, Text} from "@chakra-ui/react";

export const MessageOverview = () => {
    return (
        <Tab p={'6'} gap={'2'} w={'100%'} alignItems={'center'} bgColor={'gray.800'} rounded={'md'} cursor={'pointer'} _hover={{bgColor:'gray.700'}}>
            <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Text>
                Message content shortened
            </Text>
        </Tab>
    )
}