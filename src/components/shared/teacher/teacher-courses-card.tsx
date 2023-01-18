import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
  IconButton, Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr, useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchUserProfile } from '../../../api/users';
import { useTranslation } from 'react-i18next';

export const TeacherCoursesCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const { t, i18n } = useTranslation();
  const { data: user, isLoading } = useQuery('profile', () => fetchUserProfile(), {
    refetchOnWindowFocus: false,
  });
  return (
    <Card w={'100%'}
          bg={cardBg}
    >
      <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>{t('yourCourses')}</Heading>
      </CardHeader>
      <CardBody
        display={'flex'}
        justifyContent={'center'}
        gap={4}>
        <FormControl>
          {isLoading ? <Spinner /> : (
            <Table>
              <Thead>
                <Tr>
                  <Th>{t('courseName')}</Th>
                  <Th>{t('courseType')}</Th>
                  <Th>{t('semester')}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {
                  user.course.map((course: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; semester: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }) => {
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
          )}
        </FormControl>
      </CardBody>
    </Card>
  );
};