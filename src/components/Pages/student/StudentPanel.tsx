import {
  Box, Card,
  CardBody,
  CardHeader,
  FormControl, FormLabel,
  Heading,
  IconButton, Input,
  InputGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useUserStore } from '../../../../store';

const StudentPanel = () => {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <Card w={'100%'}
            bg={useColorModeValue('white', 'gray.800')}
      >
        <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Heading size={'md'}>Gradebook</Heading>
          <IconButton aria-label={'Go to gradebook'} icon={<ArrowForwardIcon />} />
        </CardHeader>
        <CardBody
          display={'flex'}
          justifyContent={'center'}
          gap={4}>
          <FormControl>
            <InputGroup
              display={'flex'}
              flexDir={'column'}
              gap={4}
            >
              <Box>
                <FormLabel>
                  Gradebook ID:
                </FormLabel>
                <Input variant={'outlined'} value={user.gradebook[0].gradebook_id} isDisabled />
              </Box>
              <Box>
                <FormLabel>
                  Faculty:
                </FormLabel>
                <Input variant={'outlined'}
                       value={user.gradebook[0].department_students.department.faculty.name}
                       isDisabled />
              </Box>
              <Box>
                <FormLabel>
                  Department:
                </FormLabel>
                <Input variant={'outlined'} value={user.gradebook[0].department_students.department.name}
                       isDisabled />
              </Box>
              <Box>
                <FormLabel>
                  Study type:
                </FormLabel>
                <Input variant={'outlined'} value={user.gradebook[0].department_students.department.study_type}
                       isDisabled />
              </Box>
              <Box>
                <FormLabel>
                  Degree:
                </FormLabel>
                <Input variant={'outlined'} value={user.gradebook[0].department_students.department.degree}
                       isDisabled />
              </Box>
            </InputGroup>
          </FormControl>
        </CardBody>
      </Card>
    </>
  );
};
export default StudentPanel;