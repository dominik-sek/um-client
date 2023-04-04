import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  Heading,
  IconButton,
  InputGroup,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useUserStore } from '../../../store';
import { Link } from 'react-router-dom';
import { fetchAllGradesByStudent } from '../../api/grades';
import { useQuery } from 'react-query';
import { fetchCourseByGradebook } from '../../api/courses';
import LoadingScreen from '../../components/shared/loading-screen';
import { GradeColors } from '../../constants/grade-colors';
import { useTranslation } from 'react-i18next';


const StudentPanel = () => {

  const user = useUserStore(state => state.user);
  console.log(user)
  const { gradebook } = user;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery('fetchStudentsCourses', () => fetchAllGradesByStudent(gradebook?.gradebook_id), {
    refetchOnWindowFocus: false,
  });
  const cardBg = useColorModeValue('white', 'gray.800');
  const {
    data: courses,
    isLoading: coursesLoading,
  } = useQuery('fetchCourseByGradebook', () => fetchCourseByGradebook(gradebook?.gradebook_id), {
    refetchOnWindowFocus: false,
  });
  const { t } = useTranslation();

  if (isLoading || coursesLoading) {
    return (
      <LoadingScreen />
    );
  } else {

    return (
      <Wrap
        flexDir={'column'}
        spacing={8}
      >
        <Card w={'100%'}
              bg={cardBg}
        >
          <CardHeader>
            {
              user && (
                <VStack alignItems={'flex-start'}>
                  <Heading size={'sm'}>{user.first_name} {user.last_name}</Heading>
                  <Heading size={'sm'}>{t('gradebookID')}: {gradebook.gradebook_id}</Heading>
                  <Heading size={'sm'}>{t('semester')}: {gradebook.semester}</Heading>
                </VStack>

              )

            }
          </CardHeader>
          <Divider />
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
                {coursesLoading ? (
                  <Spinner />
                ) : (
                  <Wrap>
                    <Heading size={'md'}>{t('coursesEnrolled')}</Heading>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>{t('courseName')}</Th>
                          <Th>{t('courseType')}</Th>
                          <Th>{t('semester')}</Th>
                          <Th>{t('courseCredits')}</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {courses?.map((course: { course: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; semester: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; ects: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }; }) => (
                          <Tr key={course?.course.id}>
                            <Td>{course?.course.name}</Td>
                            <Td>{t(course?.course.type)}</Td>
                            <Td>{course?.course.semester}</Td>
                            <Td>{course?.course.ects}</Td>
                          </Tr>
                        ))}
                      </Tbody>

                    </Table>
                  </Wrap>

                )}
              </InputGroup>
            </FormControl>
          </CardBody>
        </Card>


        <Card w={'100%'}
              bg={cardBg}
        >
          <CardHeader display={'flex'} justifyContent={'space-between'}>
            <Heading size={'md'}>{t('recentGrades')}</Heading>
            <IconButton as={Link} to={'/student/grades'} aria-label={'Go to all grades '} icon={<ArrowForwardIcon />} />
          </CardHeader>
          <Divider />
          <CardBody
            display={'flex'}
            justifyContent={'center'}
            gap={4}>
            {
              isLoading ? <Spinner /> : (
                <Table w={'100%'}>
                  <Thead>
                    <Tr>
                      <Th>{t('courseName')}</Th>
                      <Th>{t('courseType')}</Th>
                      <Th>{t('grade')}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      data?.slice(-3).map((grade: { grade_Id: React.Key | null | undefined; course: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }; grade: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }) => {
                        return (
                          <Tr key={grade?.grade_Id}>
                            <Td>{grade?.course?.name}</Td>
                            <Td>{grade?.course?.type}</Td>
                            <Td><Text color={
                              GradeColors[grade.grade as string]}>{grade.grade}</Text></Td>
                          </Tr>

                        );
                      })
                    }
                  </Tbody>

                </Table>
              )
            }
          </CardBody>
        </Card>
      </Wrap>
    );
  }
};
export default StudentPanel;