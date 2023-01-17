import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';

interface UserProps {
  id: number;
  account: any;
  avatar: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

interface UserCardProps {
  user: UserProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function UserCard(props: UserCardProps) {
  const { user } = props;

  return (

    <Wrap py={2}>
      <Box
        w={'full'}
        minW={'20rem'}
        minH={'15rem'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>

        <Wrap w={'100%'} display={'flex'} justifyContent={'flex-end'} pr={4} pt={4}>
          <Checkbox size={'lg'} value={user.id} onChange={props.onChange} />
        </Wrap>
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