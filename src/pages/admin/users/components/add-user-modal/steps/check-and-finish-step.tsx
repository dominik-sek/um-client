import { Box, Flex, FormControl, FormLabel, Input, Wrap, WrapItem } from '@chakra-ui/react';

export const CheckAndFinishStep = (props: { formValues: any }) => {
  const { contact, address, personal } = props.formValues;
  return (
    <Box display={'flex'} h={'100%'} gap={5}>
      <Wrap spacing={4} align={'center'} justify={'space-between'}>
        {
          Object.keys(props.formValues).map((key, index) => {
            return (
              <WrapItem key={index}>
                <FormControl>
                  <FormLabel>{key}</FormLabel>
                  <Input disabled value={props.formValues[key]} />
                </FormControl>
              </WrapItem>
            );
          })
        }
      </Wrap>
    </Box>
  );
};
