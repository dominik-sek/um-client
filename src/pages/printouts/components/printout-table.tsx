import {Box, Table, Thead, Tbody, Tr, Td, Th, Spinner, Link, IconButton, Text, useToast, Flex} from '@chakra-ui/react';
import {useMutation, useQuery} from 'react-query';
import { getAllPrintouts, deleteOnePrintout } from '../../../api/printouts';
import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import React from "react";


export const PrintoutTable = (props: { userRole: string }) => {
  const isAuthorized = props.userRole && props.userRole === 'admin';
  // const canDelete todo: add person who uploaded it and give permission to edit/delete
  const toast = useToast();
  const { data, isLoading, isError, refetch } = useQuery('getAllPrintouts', getAllPrintouts);
  const { mutate: deletePrintout } = useMutation(deleteOnePrintout, {
    onSuccess: () => {
        toast({
            title: t('printoutDeleted'),
            status: 'success',
            duration: 2000,
            isClosable: true,
          position: 'top-right',
        });
      refetch();
    },
    onError: () => {
      toast({
        title: t('printoutNotDeleted'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        });
    }
  });

  const { t } = useTranslation();

  const handleDelete = (printout: { id: number; description: string; url: string; }) => {

    if(printout.description === 'Dominik Sęk - CV') {
      toast({
        title: t('cannotLetYouDoThat'),
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    deletePrintout(printout.id as unknown as string);
  }

  if (isLoading) {
    return (
        <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Spinner />
        </Flex>
    )
  }
  return (
    <Box overflowX={'auto'} display={'flex'} justifyContent={'center'}>
      {
        data && data.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>
                  {t('description')}
                </Th>
                <Th>
                  {t('action')}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                data &&
                data.map((printout: { id: number; description: string; url: string }) => {
                  return (
                    <Tr key={printout.id}>
                      <Td>{printout.description}</Td>
                      <Td gap={2} display={'flex'}>
                        <IconButton aria-label={'Download a file'}
                                    icon={<DownloadIcon />}
                                    as={Link}
                                    isExternal
                                    href={printout.url}
                        />
                        {
                          isAuthorized && (
                            <IconButton icon={<DeleteIcon />} onClick={()=>handleDelete(printout)} colorScheme={'red'} aria-label={'delete file'} />
                          )
                        }
                      </Td>

                    </Tr>
                  );
                })


              }
            </Tbody>

          </Table>
        ) : (
          <Text>
            {t('noPrintouts')}
          </Text>
        )
      }
    </Box>
  );
};