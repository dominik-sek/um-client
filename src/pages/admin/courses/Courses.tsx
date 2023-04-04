import { useMutation, useQuery } from 'react-query';
import { getAllDepartments } from '../../../api/departments';
import {
  Accordion, AccordionButton, AccordionItem, AccordionPanel,
  Box,
  Button,
  Flex,
  HStack, IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr, useDisclosure,
  Wrap,
} from '@chakra-ui/react';

import React, { useEffect } from 'react';
import { SectionHeader } from '../../../components/shared/section-header';
import { DeleteIcon } from '@chakra-ui/icons';
import { addCourse, deleteCourse, fetchAllCourses } from '../../../api/courses';
import { AddCourseModal } from './components/add-course-modal';
import { useTranslation } from 'react-i18next';

const Courses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isError, refetch } = useQuery('fetchAllCourses', fetchAllCourses, {
    refetchOnWindowFocus: false,
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const results = data.filter((course: any) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department_course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.person.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.ects.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(results);
    }
  }, [searchTerm]);

  const { mutate } = useMutation(deleteCourse, {
    onSuccess: () => {
      refetch();
    },
  });
  const handleDelete = (courseId: number) => {
    mutate(courseId);
  };

  const { t } = useTranslation();
  return (
    <Flex gap={10} flexDir={'column'}>
      <AddCourseModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      <SectionHeader deleteButton={false} onChange={handleSearch} onAddClick={onOpen}
                     addText={t('addNewCourse')} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>{t('courseName')}</Th>
              <Th>{t('deptName')}</Th>
              <Th>{t('courseTeacher')}</Th>
              <Th>{t('semester')}</Th>
              <Th>{t('courseCredits')}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              filteredData.map((course: any) => (
                <Tr key={course.id}>
                  <Td>{course.name} {t(course.type)}</Td>
                  <Td>{course.department_course.name}</Td>
                  <Td>{course.person.first_name} {course.person.last_name}</Td>
                  <Td>{course.semester}</Td>
                  <Td>{course.ects}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label='Delete'
                        colorScheme={'red'}
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(course.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))
            }

          </Tbody>
        </Table>
      )}
    </Flex>
  );
};
export default Courses;