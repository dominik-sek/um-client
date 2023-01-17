import { Card, CardBody, CardHeader, FormControl, Heading, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface DataCardProps {
  header: string;
  children: React.ReactNode;
  hasButton?: boolean;
  button?: React.ReactNode;
}

export const DataCard = (props: DataCardProps) => {
  return (
    <Card w={'100%'}
          bg={useColorModeValue('white', 'gray.800')}
    >
      <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>{props.header}</Heading>
        {props.hasButton && props.button}
      </CardHeader>
      <CardBody
        display={'flex'}
        justifyContent={'center'}
        gap={4}>
        <FormControl>
          {props.children}
        </FormControl>
      </CardBody>
    </Card>
  );
};