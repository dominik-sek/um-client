import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  IconButton, Table, Tbody, Td, Th, Thead, Tr,
  useColorModeValue, Wrap,
} from '@chakra-ui/react';
import { UserRole } from '../../../enums/user-role';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useUserStore } from '../../../../store';
import { fetchStudentsCourses } from '../../../api/fetch-students-courses';
import { useQuery } from 'react-query';
import LoadingScreen from '../../shared/loading-screen';

const TeacherPanel = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading, isError, error } = useQuery('fetchStudentsCourses', fetchStudentsCourses, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    console.log('error', error);
  }
  return (
    <Wrap
      flexDir={'column'}
      spacing={8}
    >

      <Card w={'100%'}
            bg={useColorModeValue('white', 'gray.800')}
      >
        <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Heading size={'md'}>Your courses</Heading>
          <IconButton aria-label={'Go to course overview'} icon={<ArrowForwardIcon />} />
        </CardHeader>
        <CardBody
          display={'flex'}
          justifyContent={'center'}
          gap={4}>
          <FormControl>
            <Table>
              <Thead>
                <Tr>
                  <Th>Course name</Th>
                  <Th>Course type</Th>
                  <Th>Semester</Th>
                </Tr>
              </Thead>

              <Tbody>
                {
                  user.course.map((course) => {
                    return (
                      <Tr key={course.id}>
                        <Td>{course.name}</Td>
                        <Td>{course.type}</Td>
                        <Td>{course.semester}</Td>
                      </Tr>
                    );
                  })
                }
              </Tbody>
            </Table>
          </FormControl>
        </CardBody>
      </Card>

      <Card w={'100%'}
            bg={useColorModeValue('white', 'gray.800')}
      >
        <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Heading size={'md'}>Your students</Heading>
          <IconButton aria-label={'Go to course overview'} icon={<ArrowForwardIcon />} />
        </CardHeader>
        <CardBody>
          <Wrap spacing={8} w={'100%'}>
            {
              data.map((course) => {
                // map course.course_students
                return (
                  <Flex key={course.id} direction={'column'} gap={4} w={'100%'}>
                    <Heading size={'md'}>{course.name} - {course.type}</Heading>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Gradebook ID</Th>
                          <Th>Student</Th>
                          <Th>Student email</Th>
                          <Th>Student grades</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          course.course_students.map((student) => {
                            return (
                              <Tr key={student.gradebook_id}>
                                <Td>{student.gradebook_id}</Td>
                                <Td>{student.gradebook.person.first_name} {student.gradebook.person.last_name}</Td>
                                <Td>{student.gradebook.person.contact.email}</Td>
                                <Td> <IconButton w={'100%'} aria-label={'Go to student gradebook'}
                                                 icon={<ArrowForwardIcon />} />
                                </Td>
                              </Tr>
                            );
                          })
                        }

                      </Tbody>
                    </Table>
                  </Flex>
                );
              })
            }
          </Wrap>
        </CardBody>

      </Card>

    </Wrap>
  );
};
export default TeacherPanel;