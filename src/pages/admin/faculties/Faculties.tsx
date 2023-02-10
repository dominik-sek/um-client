import { useMutation, useQuery } from 'react-query';
import { createFaculty, deleteFaculty, getAllFaculties } from '../../../api/faculties';
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
import { AddFacultyModal } from './components/add-faculty-modal';
import { useTranslation } from 'react-i18next';

const Faculties = () => {
  const { data, isLoading, isError, refetch } = useQuery('getAllFaculties', getAllFaculties, {
    refetchOnWindowFocus: false,
  });
  const { onOpen, isOpen, onClose } = useDisclosure();
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
      const results = data.filter((faculty: any) =>
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.person.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(results);
    }
  }, [searchTerm]);
  const { mutate: deleteOneFaculty } = useMutation(deleteFaculty, {
    onSuccess: () => {
      refetch();
    },
  });
  const handleDelete = (id: string) => {
    deleteOneFaculty(id);
  };
  const { t } = useTranslation();
  return (
    <Flex gap={10} flexDir={'column'}>
      <AddFacultyModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      <SectionHeader addText={t('addNewFaculty')} deleteButton={false} onChange={handleSearch} onAddClick={onOpen} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>{t('dean')}</Th>
              <Th>{t('facultyName')}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData?.map((faculty: any) => (
              <Tr key={faculty.id}>
                <Td>{faculty.person.first_name} {faculty.person.last_name}</Td>
                <Td>{faculty.name}</Td>
                <Td>
                  <IconButton aria-label={'delete faculty'} icon={<DeleteIcon />} colorScheme={'red'}
                              onClick={() => handleDelete(faculty.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Flex>
  );
};
export default Faculties;