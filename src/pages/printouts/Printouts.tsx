import { SectionHeader } from '../../components/shared/section-header';
import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { AddPrintoutModal } from './components/add-printout-modal';
import { PrintoutTable } from './components/printout-table';
import { useQuery } from 'react-query';
import { getAllPrintouts } from '../../api/printouts';
import { checkAuth } from '../../api/check-auth';
import { useTranslation } from 'react-i18next';

export const Printouts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    refetch: refetchPrintouts,
  } = useQuery('getAllPrintouts', getAllPrintouts, {});

  const { data: auth, isLoading: authLoading, isError: authError } = useQuery('checkAuth', checkAuth, {});
  const { t } = useTranslation();
  return (
    <Flex gap={10} flexDir={'column'}>
      {
        (auth.role === 'admin' || auth.role === 'teacher') &&
        <Box>
          <SectionHeader addText={t('uploadNewPrintout')} deleteButton={false} onAddClick={onOpen} />
          <AddPrintoutModal isOpen={isOpen} onClose={onClose} refetch={refetchPrintouts} />
        </Box>

      }
      <PrintoutTable userRole={auth.role} />
    </Flex>
  );
};

export default Printouts;