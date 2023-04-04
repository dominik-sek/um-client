import { Box, Table, Thead, Tbody, Tr, Td, Th, Spinner, Link, IconButton, Text } from '@chakra-ui/react';
import {useMutation, useQuery} from 'react-query';
import { getAllPrintouts, deleteOnePrintout } from '../../../api/printouts';
import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export const PrintoutTable = (props: { userRole: string }) => {
  const isAuthorized = props.userRole && props.userRole === 'admin';
  // const canDelete todo: add person who uploaded it and give permission to edit/delete
  const { data, isLoading, isError, refetch } = useQuery('getAllPrintouts', getAllPrintouts);
  const { mutate: deletePrintout } = useMutation(deleteOnePrintout, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
        console.log('error');
    }
  });

  const { t } = useTranslation();

  const handleDelete = (printoutId: string) => {
    deletePrintout(printoutId);
  }

  if (isLoading) {
    return <Spinner />;
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
                data.map((printout: { id: string; description: string; url: string }) => {
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
                            <IconButton icon={<DeleteIcon />} onClick={()=>handleDelete(printout.id)} colorScheme={'red'} aria-label={'delete file'} />
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