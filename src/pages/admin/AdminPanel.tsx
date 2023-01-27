import { Card, CardBody, CardHeader, Flex, Grid, Heading, SimpleGrid, Spinner, Wrap } from '@chakra-ui/react';
import { fetchUserProfile } from '../../api/users';
import { useQuery } from 'react-query';
import LoadingScreen from '../../components/shared/loading-screen';
import { CourseGradesCard } from '../../components/shared/teacher/course-grades-card';
import { StudentsInCourseCard } from '../../components/shared/teacher/students-in-course-card';
import { TeacherCoursesCard } from '../../components/shared/teacher/teacher-courses-card';
import CalendarComponent from '../../components/shared/CalendarComponent';

const AdminPanel = (): JSX.Element => {
  const { data, isLoading } = useQuery('profile', () => fetchUserProfile(), {
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Flex flexDir={'column'} gap={4}>
      <CalendarComponent />
      {data.course && data.course.length > 0 ? (
          <Wrap>
            <CourseGradesCard />
            <StudentsInCourseCard />
            <TeacherCoursesCard />
          </Wrap>
        ) :
        (
          <></>
        )}

      <Wrap>

      </Wrap>

    </Flex>
  );

};

export default AdminPanel;