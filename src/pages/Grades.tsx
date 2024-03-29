import {
	Box,
	Button,
	Flex,
	FormControl,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import {
	AddIcon,
	ChevronDownIcon,
	DeleteIcon,
	EditIcon,
} from '@chakra-ui/icons';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
	addGrade,
	deleteGrade,
	fetchAllGradesByTeacher,
	updateGrade,
} from '../api/grades';
import DangerModal from '../components/shared/danger-modal';
import { fetchStudentsCourses } from '../api/courses';
import { grade } from '@prisma/client';
import { DataCard } from '../components/shared/data-card';
import { fetchUserProfile } from '../api/users';
import { useTranslation } from 'react-i18next';
import { course } from '@prisma/client';
type CourseGrades = {
	grade: GradeWithIndex[];
	id: number;
	name: string;
	type: string;
};
type GradeWithIndex = {
	grade_Id: number;
} & grade;

function GradeMenu(props: {
	gradebookId: number;
	courseId: number;
	handleDelete: () => void;
	handleEdit: () => void;
	isEdited: boolean;
	handleSave: () => void;
	isSaveLoading: boolean;
	isDeleteLoading: boolean;
}) {
	const { t } = useTranslation();
	return (
		<Box gap={2} display={'flex'}>
			{props.isEdited ? (
				<Button colorScheme={'green'}
						onClick={props.handleSave}
						loadingText={''}
						isLoading={props.isSaveLoading}
						disabled={props.isSaveLoading}
				>
					{t('save')}
				</Button>
			) : (
				<IconButton
					aria-label={'Edit grade'}
					colorScheme={'blue'}
					icon={<EditIcon />}
					onClick={props.handleEdit}
				/>
			)}
			<IconButton
				as={Button}
				aria-label={'Delete grade'}
				colorScheme={'red'}
				icon={<DeleteIcon />}
				onClick={props.handleDelete}
				loadingText={''}
				isLoading={props.isDeleteLoading}
				disabled={props.isDeleteLoading}
			/>
		</Box>
	);
}

const Grades = () => {
	const { data: user, isLoading: userLoading } = useQuery(
		'fetchUserProfile',
		fetchUserProfile,
		{
			refetchOnWindowFocus: false,
		},
	);

	const {
		data: grades,
		isLoading: gradesLoading,
		refetch: refetchGrades,
	} = useQuery('fetchAllGradesByTeacher', fetchAllGradesByTeacher, {
		refetchOnWindowFocus: false,
	});

	const {
		isOpen: isAddOpen,
		onOpen: onAddOpen,
		onClose: onAddClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();
	const [deletedGrade, setDeletedGrade] = React.useState<number>(-1);
	const [editedGrade, setEditedGrade] = React.useState<{
		id: number;
		grade: string;
	}>({} as { id: number; grade: string });

	const [isEdited, setIsEdited] = React.useState<number>(-1);
	const [pickedCourse, setPickedCourse] = React.useState<course>(
		null as unknown as course,
	);
	const [pickedUser, setPickedUser] = React.useState<any>();
	const gradeRef = React.useRef<any>(null);

	const { t } = useTranslation();
	const { data: courseStudents, isLoading: courseStudentsLoading } = useQuery(
		'fetchStudentsCourses',
		fetchStudentsCourses,
		{
			refetchOnWindowFocus: false,
		},
	);
	const handleDeleteGrade = (gradeId: number) => {
		setDeletedGrade(gradeId);
		onDeleteOpen();
	};
	const toast = useToast();
	const { mutate: deleteGradeMutation, isLoading:deleteGradeLoading } = useMutation(deleteGrade, {
		onSuccess: () => {
			toast({
				title: 'Grade deleted',
				description: 'The grade has been deleted',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			refetchGrades();
			onDeleteClose();
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'An error occurred while deleting the grade',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
		},
	});
	const { mutate: addGradeMutation, isLoading:addGradeLoading } = useMutation(addGrade, {
		onSuccess: () => {
			toast({
				title: 'Grade added',
				description: 'The grade has been added',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			refetchGrades();
			onAddClose();
		},
		onError: () => {
			toast({
				title: 'Grade not added',
				description: 'The grade has not been added',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
		},
	});
	const { mutate: editGradeMutation, isLoading:editGradeLoading } = useMutation(updateGrade, {
		onSuccess: () => {
			toast({
				title: 'Grade edited',
				description: 'The grade has been edited',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			refetchGrades();
			setEditedGrade({} as { id: number; grade: string });
			setIsEdited(-1);
		},
		onError: () => {
			toast({
				title: 'Grade not edited',
				description: 'The grade has not been edited',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
		},
	});

	const handleConfirmDelete = () => {
		deleteGradeMutation(deletedGrade);
	};

	const handleAddGrade = () => {
		onAddOpen();
	};

	const handleSaveGrade = () => {
		addGradeMutation({
			gradebookId: pickedUser.gradebook.gradebook_id,
			courseId: pickedCourse!.id,
			grade: gradeRef.current.value,
		});
	};
	const handleEditMutation = () => {
		editGradeMutation({
			gradeId: editedGrade.id,
			grade: Number(editedGrade.grade),
		});
	};

	const handleCancelAdd = () => {
		setPickedCourse({} as course);
		setPickedUser(null);
		onAddClose();
	};

	const handleEditGrade = (gradeId: number) => {
		setIsEdited(gradeId);
	};

	const pickCourse = () => {
		return (
			<Menu matchWidth>
				<MenuButton
					width={'100%'}
					as={Button}
					rightIcon={<ChevronDownIcon />}>
					{pickedCourse
						? `${pickedCourse.name} - ${pickedCourse.type}`
						: t('pickCourse')}
				</MenuButton>
				{userLoading ? (
					<Flex
						w={'100%'}
						justifyContent={'center'}
						alignItems={'center'}>
						<Spinner />
					</Flex>
				) : (
					<MenuList>
						{user.course.map((course: course) => (
							<MenuItem
								w={'100%'}
								key={course.id}
								onClick={() => setPickedCourse(course)}>
								{course.name} - {course.type}
							</MenuItem>
						))}
					</MenuList>
				)}
			</Menu>
		);
	};
	const pickUserInCourse = () => {
		return (
			<Menu matchWidth>
				<MenuButton
					disabled={!pickedCourse}
					width={'100%'}
					as={Button}
					rightIcon={<ChevronDownIcon />}>
					{pickedUser
						? `${pickedUser.gradebook.person.last_name} - ${pickedUser.gradebook.gradebook_id}`
						: t('pickUser')}
				</MenuButton>
				{courseStudentsLoading ? (
					<Flex
						w={'100%'}
						justifyContent={'center'}
						alignItems={'center'}>
						<Spinner />
					</Flex>
				) : (
					<MenuList overflowY={'scroll'} maxH={'300px'}>
						{courseStudents.map(
							(course: { course_students: any[]; id: any }) =>
								course?.course_students.map((student) => {
									const gradebook = student.gradebook;
									const person = gradebook.person;
									if (course.id === pickedCourse?.id) {
										return (
											<MenuItem
												w={'100%'}
												key={gradebook.gradebook_id}
												onClick={() =>
													setPickedUser(student)
												}>
												{person.last_name} -{' '}
												{gradebook.gradebook_id}
											</MenuItem>
										);
									}
								}),
						)}
					</MenuList>
				)}
			</Menu>
		);
	};
	const editGradeModal = () => {
		return (
			<Modal isOpen={isAddOpen} onClose={onAddClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('addGrade')}</ModalHeader>
					<ModalBody>
						<FormControl>
							<Text>{t('grade')}: </Text>
							<NumberInput
								defaultValue={2.0}
								precision={1}
								min={2.0}
								max={5.0}
								step={0.5}>
								<NumberInputField ref={gradeRef} />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							<Text>{t('course')}:</Text>
							<Box width={'100%'}>{pickCourse()}</Box>
							<Text>Student:</Text>
							{pickUserInCourse()}
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme={'blue'}
							mr={3}
							onClick={handleCancelAdd}>
							{t('close')}
						</Button>

						<Button
							disabled={!pickedCourse || !pickedUser || addGradeLoading}
							colorScheme={'green'}
							loadingText={
								t('login-screen.sign-in-btn-loading') ??
								'Loading...'
							}
							isLoading={addGradeLoading}
							onClick={handleSaveGrade}>
							{t('save')}
						</Button>
					</ModalFooter>
				</ModalContent>

			</Modal>
		);
	};

	return (
		<Box>
			<DangerModal
				handleConfirm={handleConfirmDelete}
				isOpen={isDeleteOpen}
				onClose={onDeleteClose}>
				<Text textAlign={'center'}>
					Are you sure you want to delete this grade?
				</Text>
			</DangerModal>

			{editGradeModal()}
			<DataCard
				header={t('grades')}
				hasButton
				button={
					<Button
						colorScheme={'blue'}
						leftIcon={<AddIcon />}
						onClick={handleAddGrade}>
						{t('addGrade')}
					</Button>
				}>
				{gradesLoading || userLoading ? (
					<Flex
						w={'100%'}
						justifyContent={'center'}
						alignItems={'center'}>
						<Spinner />
					</Flex>
				) : (
					<Box overflowX={'auto'}>
						<Table>
							<Thead>
								<Tr>
									<Th>{t('courseName')}</Th>
									<Th>{t('gradebookID')}</Th>
									<Th>{t('date')}</Th>
									<Th>{t('grade')}</Th>
									<Th>{t('action')}</Th>
								</Tr>
							</Thead>
							<Tbody>
								{grades.map((grade: CourseGrades) =>
									grade.grade.map(
										(innerGrade: GradeWithIndex) => {
											return (
												<Tr key={innerGrade.grade_Id}>
													<Td>
														{grade.name} -{' '}
														{t(grade.type)}
													</Td>
													<Td>
														{
															innerGrade.gradebook_id
														}
													</Td>
													<Td>
														{new Date(
															innerGrade.entry_time,
														).toLocaleDateString()}
													</Td>
													<Td>
														<NumberInput
															maxW={'fit-content'}
															defaultValue={
																innerGrade.grade
															}
															precision={1}
															isDisabled={
																isEdited !==
																innerGrade.grade_Id
															}
															min={2.0}
															max={5.0}
															onChange={(
																value,
															) => {
																setEditedGrade({
																	id: innerGrade.grade_Id,
																	grade: value,
																});
															}}
															step={0.5}>
															<NumberInputField />
															<NumberInputStepper>
																<NumberIncrementStepper />
																<NumberDecrementStepper />
															</NumberInputStepper>
														</NumberInput>
													</Td>
													{user?.role !==
														'student' && (
														<Td>
															<GradeMenu
																gradebookId={
																	innerGrade.gradebook_id
																}
																courseId={
																	innerGrade.course_id
																}
																handleDelete={() =>
																	handleDeleteGrade(
																		innerGrade.grade_Id,
																	)
																}
																handleEdit={() =>
																	handleEditGrade(
																		innerGrade.grade_Id,
																	)
																}
																isEdited={
																	isEdited ===
																	innerGrade.grade_Id
																}
																handleSave={() =>
																	handleEditMutation()
																}
																isSaveLoading={editGradeLoading}
																isDeleteLoading={deleteGradeLoading}
															/>
														</Td>
													)}
												</Tr>
											);
										},
									),
								)}
							</Tbody>
						</Table>
					</Box>
				)}
			</DataCard>
		</Box>
	);
};
export default Grades;
