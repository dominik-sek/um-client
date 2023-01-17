import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
  IconButton, Spinner,
  Table,
  Tbody, Td,
  Th,
  Thead,
  Tr, useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { grade } from '@prisma/client';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllGradesByTeacher } from '../../../api/grades';
import { useAuthStore } from '../../../../store';

type courseGrades = {
  grade: grade[];
  id: number;
  name: string;
  type: string;
}

export const CourseGradesCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const role = useAuthStore(state => state.role);
  const {
    data: grades,
    isLoading: gradesLoading,
  } = useQuery('fetchAllGradesByTeacher', fetchAllGradesByTeacher, {
    refetchOnWindowFocus: false,
  });

  return (
    <Card w={'100%'}
          bg={cardBg}
    >
      <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>Grades</Heading>
        <Link to={`/${role}/grades`}> <IconButton aria-label='Go to grades' icon={<ArrowForwardIcon />} /></Link>
      </CardHeader>
      <CardBody
        display={'flex'}
        justifyContent={'center'}
        gap={4}>
        <FormControl>
          {gradesLoading ? <Spinner /> : (
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
                  grades.slice(-3).map((course: courseGrades) =>
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
          )}
        </FormControl>
      </CardBody>
    </Card>
  );
};