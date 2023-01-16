import { Avatar, Box, Button, Flex, Stack, Text, useColorModeValue, Wrap } from '@chakra-ui/react';

interface UserProps {
  account: any;
  avatar: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

interface UserCardProps {
  user: UserProps;
}


export default function UserCard(props: UserCardProps) {
  const { user } = props;

  return (
    <Wrap py={6}>
      <Box
        w={'full'}
        minW={'20rem'}
        minH={'15rem'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>

        <Flex justify={'center'} mt={12}>
          <Avatar
            size={'xl'}
            src={
              user.account.account_images?.avatar_url ?? ''
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Text textAlign={'center'} fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user.first_name} {user.last_name}
            </Text>
            <Text color={'gray.500'}>{user.role}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{user.email}</Text>
            </Stack>

          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Wrap>
  );
}