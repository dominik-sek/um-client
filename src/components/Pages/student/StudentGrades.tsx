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
import { useUserStore } from '../../../../store';
import { fetchAllGradesByStudent } from '../../../api/grades';
import { useQuery } from 'react-query';
import { GradeColors } from '../../../constants/grade-colors';
import { FiRefreshCcw } from 'react-icons/all';

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
  const openFilterMenu = () => {
    console.log('filter');
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
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
                Your grades
              </Heading>
              <IconButton aria-label={'Refresh grades'} onClick={() => {
                refetch();
              }} icon={<FiRefreshCcw />} />
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
                    <Th>Course name</Th>
                    <Th>Course type</Th>
                    <Th>Grade</Th>
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