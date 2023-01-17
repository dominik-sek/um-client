import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody, Td,
  Th,
  Thead,
  Tr, useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchStudentsCourses } from '../../../api/courses';

export const StudentsInCourseCard = () => {
  const { data, isLoading, isError, error } = useQuery('fetchStudentsCourses', fetchStudentsCourses, {
    refetchOnWindowFocus: false,
  });
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card w={'100%'}
          bg={cardBg}
    >
      <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>Your students</Heading>
      </CardHeader>
      <CardBody>
        {isLoading ? <Spinner /> : (
          <Wrap spacing={8} w={'100%'}>
            {
              data.map((course: {
                id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; course_students: { gradebook_id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; gradebook: { person: { first_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; last_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; contact: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }; }; }; }[];
              }) => {
                //fetch by course id
                return (
                  <Flex key={course.id} direction={'column'} gap={4} w={'100%'}>
                    <Heading size={'md'}>{course.name} - {course.type}</Heading>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Gradebook ID</Th>
                          <Th>Student</Th>
                          <Th>Student email</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          course?.course_students?.map((student: { gradebook_id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; gradebook: { person: { first_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; last_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; contact: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }; }; }; }) => {
                            return (
                              <Tr key={`${student.gradebook_id}-${course.id}`}>
                                <Td>{student.gradebook_id}</Td>
                                <Td>{student.gradebook.person.first_name} {student.gradebook.person.last_name}</Td>
                                <Td>{student.gradebook.person.contact.email}</Td>
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
        )}

      </CardBody>

    </Card>
  );
};