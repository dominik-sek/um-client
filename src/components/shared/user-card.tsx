import { Avatar, Box, Button, Checkbox, Flex, Stack, Text, useColorModeValue, Wrap } from '@chakra-ui/react';
import React, {useCallback, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole } from '../../enums/user-role';
import {UserData} from "../../types/User";
import {useInView} from "framer-motion";
import {use} from "i18next";

interface UserCardProps {
  user: UserData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: (userId: number) => void;
}

function UserCard(props: UserCardProps) {
  const { user } = props;
  const { t } = useTranslation();

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  }, [props.onChange]);

  const handleOnEditClick = useCallback((userId: number) => {
    props.onEditClick(userId);
  }, [props.onEditClick]);



  return (
    <Wrap py={2}>
      <Box
        w={'full'}
        minW={'15rem'}
        minH={'10rem'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}

      >
            <Wrap w={'100%'} display={'flex'} justifyContent={'flex-end'} pr={4} pt={4}>
              <Checkbox size={'lg'} value={user.id} onChange={handleOnChange} />
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
            <Text color={'gray.500'}>{t(user.role as UserRole)}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{user.contact.email}</Text>
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
            onClick={() => handleOnEditClick(user.id)}>
            {t('edit')}
          </Button>
        </Box>
      </Box>
    </Wrap>
  );
}

export default React.memo(UserCard);