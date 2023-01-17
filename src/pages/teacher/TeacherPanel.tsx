import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useUserStore } from '../../../store';
import { fetchStudentsCourses } from '../../api/fetch-students-courses';
import { useQuery } from 'react-query';
import LoadingScreen from '../../components/shared/loading-screen';
import { Link } from 'react-router-dom';
import { fetchAllGradesByTeacher } from '../../api/grades';
import { grade } from '@prisma/client';

type courseGrades = {
  grade: grade[];
  id: number;
  name: string;
  type: string;
}
const TeacherPanel = () => {

  const user = useUserStore(state => state.user);
  const {
    data: grades,
    isLoading: gradesLoading,
  } = useQuery('fetchAllGradesByTeacher', fetchAllGradesByTeacher, {
    refetchOnWindowFocus: false,
  });
  console.log(grades);
  const { data, isLoading, isError, error } = useQuery('fetchStudentsCourses', fetchStudentsCourses, {
    refetchOnWindowFocus: false,
  });
  const cardBg = useColorModeValue('white', 'gray.800');

  if (isLoading || gradesLoading) {
    return <LoadingScreen />;
  } else {


    if (isError || gradesLoading) {
      console.log('error', error);
    }
    return (
      <Wrap
        flexDir={'column'}
        spacing={8}
      >

        <Card w={'100%'}
              bg={cardBg}
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
              bg={cardBg}
        >
          <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
            <Heading size={'md'}>Grades</Heading>
            <Link to={'/teacher/grades'}>
              <IconButton aria-label={'Go to grades overview'} icon={<ArrowForwardIcon />} />
            </Link>
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
                    <Th>Gradebook ID</Th>
                    <Th>Date</Th>
                    <Th>Grade</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {
                    gradesLoading ? <Spinner /> : grades.slice(-3).map((course: courseGrades) =>
                      course.grade.map((innerGrade: grade) => {
                        return (
                          <Tr key={innerGrade.entry_time.toString()}>
                            <Td>{course.name} - {course.type}</Td>
                            <Td>{innerGrade.gradebook_id}</Td>
                            <Td>{innerGrade.entry_time.toString()}</Td>
                            <Td>{innerGrade.grade}</Td>
                          </Tr>
                        );
                      }),
                    )
                  }


                </Tbody>
              </Table>
            </FormControl>
          </CardBody>
        </Card>

        <Card w={'100%'}
              bg={cardBg}
        >
          <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
            <Heading size={'md'}>Your students</Heading>
            <IconButton aria-label={'Go to course overview'} icon={<ArrowForwardIcon />} />
          </CardHeader>
          <CardBody>
            <Wrap spacing={8} w={'100%'}>
              {
                data.map((course: {
                  id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; course_students: { gradebook_id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; gradebook: { person: { first_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; last_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; contact: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }; }; }; }[];
                }) => {
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
          </CardBody>

        </Card>

      </Wrap>
    );
  }
};
export default TeacherPanel;