import { Box, Table, Thead, Tbody, Tr, Td, Th, Spinner, Link, IconButton, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getAllPrintouts } from '../../../api/printouts';
import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export const PrintoutTable = (props: { userRole: string }) => {
  const isAuthorized = props.userRole && props.userRole === 'admin';
  // const canDelete todo: add person who uploaded it and give permission to edit/delete
  const { data, isLoading, isError } = useQuery('getAllPrintouts', getAllPrintouts);
  console.log(data);
  const { t } = useTranslation();

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
                data.map((printout: { id: Key | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | Iterable<ReactNode> | null | undefined; url: any; }) => {
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
                            <IconButton icon={<DeleteIcon />} aria-label={'delete file'} />
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