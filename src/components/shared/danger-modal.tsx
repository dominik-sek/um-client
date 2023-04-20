import {
	Button,
	Divider,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import socket from "../../socket";
const message = {
	content:"dupa",
}
const user = {
	id: 1
}
const handleButtonPress = () => {
	socket.emit("send_global_message", {message: message, userId: user.id});
}

function DangerModal(props: {
	footerText?: JSX.Element;
	isOpen: boolean;
	onClose: () => void;
	handleConfirm: () => void;
	children: any;
	heading?: string;
	dangerText?: string;
}) {
	const { t } = useTranslation();
	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
			size={{ base: 'md', md: '2xl', lg: '4xl' }}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader
					w={'100%'}
					display={'flex'}
					flexDir={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={'4'}>
					<WarningTwoIcon boxSize={'100px'} color={'orange.300'} />
					<Heading size={'md'}>{t('dangerModalProceed')}</Heading>
					<Heading size={'xs'} textAlign={'center'}>
						{props.dangerText ?? 'This action cannot be undone'}
					</Heading>
				</ModalHeader>
				<Divider />
				<ModalBody>{props.children}</ModalBody>
				<Divider />
				<ModalFooter gap={6}>
					{props.footerText}
					<Button
						colorScheme={'green'}
						variant={'solid'}
						onClick={props.handleConfirm}>
						{t('yes')}
					</Button>
					<Button
						colorScheme={'red'}
						variant={'solid'}
						onClick={props.onClose}>
						{t('no')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default DangerModal;
