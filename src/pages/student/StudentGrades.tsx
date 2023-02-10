import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  HStack,
  IconButton,
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
import React from 'react';
import { useUserStore } from '../../../store';
import { fetchAllGradesByStudent, generatePdfByGradebook } from '../../api/grades';
import { useMutation, useQuery } from 'react-query';
import { GradeColors } from '../../constants/grade-colors';
import { FiDownload, FiRefreshCcw } from 'react-icons/all';
import { useTranslation } from 'react-i18next';

const StudentGrades = () => {

  const user = useUserStore((state) => state.user);
  const { gradebook } = user;
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery('fetchStudentGrades', () => fetchAllGradesByStudent(gradebook.gradebook_id), {
    refetchOnWindowFocus: false,
  });

  const { mutate: generatePDF } = useMutation(() => generatePdfByGradebook(gradebook.gradebook_id), {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    }
  });
  const openFilterMenu = () => {
    console.log('filter');
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const generateGradeReport = () => {
    generatePDF();
  };
  const { t, i18n } = useTranslation();
  return (
    <Wrap
      flexDir={'column'}
      spacing={8}
    >

      <Card w={'100%'}
            bg={useColorModeValue('white', 'gray.800')}
      >
        <CardHeader display={'flex'}>
          <VStack alignItems={'flex-start'} width={'100%'} gap={2}>
            <HStack display={'flex'} justifyContent={'space-between'} w={'100%'}>
              <Heading size={'md'}>
                {t('yourGrades')}
              </Heading>
              <HStack>
                <IconButton aria-label={'Generate report'} onClick={() => {
                  generateGradeReport();
                }} icon={<FiDownload />} />
                <IconButton aria-label={'Refresh grades'} onClick={() => {
                  refetch();
                }} icon={<FiRefreshCcw />} />
              </HStack>
            </HStack>

            {/*<HStack>*/}
            {/*  <SearchBar onChange={(e) => handleOnChange(e)} />*/}

            {/*</HStack>*/}
          </VStack>

        </CardHeader>
        <Divider />
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
                    data?.map((grade: { grade_Id: React.Key | null | undefined; course: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }; grade: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }) => {
                      return (
                        <Tr key={grade.grade_Id}>
                          <Td>{grade.course.name}</Td>
                          <Td>{grade.course.type}</Td>
                          <Td><Text color={
                            //@ts-ignore
                            GradeColors[grade.grade]}>{grade.grade}</Text></Td>
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
};
export default StudentGrades;