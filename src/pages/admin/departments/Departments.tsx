import { useMutation, useQuery } from 'react-query';
import { deleteDepartment, getAllDepartments } from '../../../api/departments';
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
  Tr, useDisclosure, useToast,
  Wrap,
} from '@chakra-ui/react';

import React, { useEffect } from 'react';
import { SectionHeader } from '../../../components/shared/section-header';
import { DeleteIcon } from '@chakra-ui/icons';
import { AddDepartmentModal } from './components/add-department-modal';
import { useTranslation } from 'react-i18next';
import {useActionNotAllowed} from "../../../hooks/useActionNotAllowed";

const Departments = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useQuery('getAllDepartments', getAllDepartments, {
    refetchOnWindowFocus: false,
  });
  const { mutate: deleteOneDepartment } = useMutation(deleteDepartment, {
    onSuccess: () => {
      refetch();
    },
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
      const results = data.filter((department: any) =>
        department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.study_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.length.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(results);
    }
  }, [searchTerm]);

  const handleDelete = (departmentId: string) => {
    toast({
      title: t('cannotLetYouDoThat'),

      status: "info",
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    })
    // deleteOneDepartment(departmentId);
  };

  return (
    <Flex gap={10} flexDir={'column'}>
      <AddDepartmentModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      <SectionHeader addText={t('addNewDepartment')} deleteButton={false} onChange={handleSearch} onAddClick={onOpen} searchPlaceholder={t('searchDepartments') as string} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>{t('deptName')} </Th>
              <Th>{t('facultyName')}</Th>
              <Th>{t('lengthOfStudies')}</Th>
              <Th>{t('studyType')}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              filteredData.map((department: any) => (
                <Tr key={department.id}>
                  <Td>{department.name}</Td>
                  <Td>{department.faculty.name}</Td>
                  <Td>{department.length}</Td>
                  <Td>{department.study_type}</Td>
                  <Td>
                    <IconButton aria-label={'delete faculty'} icon={<DeleteIcon />} colorScheme={'red'}
                                onClick={() => handleDelete(department.id)} />
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
export default Departments;