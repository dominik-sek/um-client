import { useMutation, useQuery } from 'react-query';
import { deleteFaculty, getAllFaculties } from '../../../api/faculties';
import {
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr, useDisclosure, useToast,
} from '@chakra-ui/react';

import React, { useEffect } from 'react';
import { SectionHeader } from '../../../components/shared/section-header';
import { DeleteIcon } from '@chakra-ui/icons';
import { AddFacultyModal } from './components/add-faculty-modal';
import { useTranslation } from 'react-i18next';
import {faculty, person} from "@prisma/client";

type facultyCoalesced = faculty & { person: person };
const Faculties = () => {
  const { data, isLoading, isError, refetch } = useQuery('getAllFaculties', getAllFaculties, {
    refetchOnWindowFocus: false,
  });
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const toast = useToast();
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
      const results = data.filter((faculty: facultyCoalesced) =>
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
    toast({
        title: t('cannotLetYouDoThat'),
        // description: 'Faculty has been deleted',
        status: 'info',
        duration: 2000,
      position: 'top-right',
    })
    // deleteOneFaculty(id);
  };
  const { t } = useTranslation();
  return (
    <Flex gap={10} flexDir={'column'}>
      <AddFacultyModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      <SectionHeader addText={t('addNewFaculty') as string} deleteButton={false} onChange={handleSearch} onAddClick={onOpen} searchPlaceholder={t('searchFaculties') as string} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>{t('dean')}</Th>
              <Th>{t('facultyName')}</Th>
              <Th>{t('action')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData?.map((faculty: facultyCoalesced) => (
              <Tr key={faculty.id}>
                <Td>{faculty.person.first_name} {faculty.person.last_name}</Td>
                <Td>{faculty.name}</Td>
                <Td>
                  <IconButton aria-label={'delete faculty'} icon={<DeleteIcon />} colorScheme={'red'}
                              onClick={() => handleDelete(faculty.id as unknown as string)} />
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