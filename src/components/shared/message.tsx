import { Box, Heading, ScaleFade, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';

const Message = (props: { show: boolean, message: string, variant: string }) => {
  const heading = () => {
    switch (props.variant) {
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error!';
      case 'warning':
        return 'Warning!';
      case 'info':
        return 'Info!';
    }
  };
  const icon = () => {
    switch (props.variant) {
      case 'success':
        return <CheckCircleIcon boxSize={'50px'} color={'green.500'} />;
      case 'error':
        return <CheckCircleIcon boxSize={'50px'} color={'red.500'} />;
      case 'warning':
        return <CheckCircleIcon boxSize={'50px'} color={'yellow.500'} />;
      case 'info':
        return <CheckCircleIcon boxSize={'50px'} color={'blue.500'} />;
    }
  };

  return (
    <Box
      position={'absolute'}
      top={'0'}
      left={'0'}
      w={'100%'}
      h={'100%'}
      zIndex={9999}
      display={props.show ? 'flex' : 'none'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'rgba(0,0,0,0.8)'}
    >
      {icon()}
      <Heading as='h2' size='xl' mt={6} mb={2} color={'white'}>
        {heading()}
      </Heading>
      <Text color={'gray.500'}>
        {props.message}
      </Text>
    </Box>
  );
};
export default Message;