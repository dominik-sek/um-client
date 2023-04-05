import { Box, FormControl, FormLabel, Input, Wrap } from '@chakra-ui/react';

export const ModalBody = (props: { formValues: any }) => {
	const { contact, address, personal } = props.formValues;
	return (
		<Box display={'flex'} gap={5}>
			<Wrap width={'50%'}>
				{Object.keys(props.formValues).map((key, index) => {
					// if keys are not contact, address or personal
					if (
						key !== 'contact' &&
						key !== 'address' &&
						key !== 'personal'
					) {
						return (
							<FormControl key={index}>
								<FormLabel>{key}</FormLabel>
								<Input disabled value={props.formValues[key]} />
							</FormControl>
						);
					}
				})}
				{Object.keys(personal).map((key, index) => {
					return (
						<FormControl key={index}>
							<FormLabel>{key}</FormLabel>
							<Input disabled value={personal[key]} />
						</FormControl>
					);
				})}
			</Wrap>
			<Wrap width={'50%'}>
				{Object.keys(contact).map((key, index) => {
					return (
						<FormControl key={index}>
							<FormLabel>{key}</FormLabel>
							<Input disabled value={contact[key]} />
						</FormControl>
					);
				})}
				{Object.keys(address).map((key, index) => {
					return (
						<FormControl key={index}>
							<FormLabel>{key}</FormLabel>
							<Input disabled value={address[key]} />
						</FormControl>
					);
				})}
			</Wrap>
		</Box>
	);
};
