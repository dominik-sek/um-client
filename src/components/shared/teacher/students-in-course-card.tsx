import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	IconButton,
	Spinner,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Wrap,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchStudentsCourses } from '../../../api/courses';
import { useTranslation } from 'react-i18next';
import LoadingScreen from '../loading-screen';
import {
	AiOutlineArrowDown,
	BiCommentDots,
	BsArrowsExpand,
	BsThreeDots,
} from 'react-icons/all';

export const StudentsInCourseCard = () => {
	const { data, isLoading, isError, error } = useQuery(
		'fetchStudentsCourses',
		fetchStudentsCourses,
		{
			refetchOnWindowFocus: false,
		},
	);
	const MAX_VISIBLE = 3;
	const cardBg = useColorModeValue('white', 'gray.800');
	const { t } = useTranslation();
	//handle expand button
	const [expand, setExpand] = React.useState({
		courseId: -1,
		isExpanded: false,
	});
	const handleExpand = (courseId: number) => {
		setExpand({
			courseId: courseId,
			isExpanded: !expand.isExpanded,
		});
	};
	return (
		<Card w={'100%'} bg={cardBg}>
			<CardHeader
				w={'100%'}
				display={'flex'}
				justifyContent={'space-between'}>
				<Heading size={'md'}>{t('yourStudents')}</Heading>
			</CardHeader>
			<CardBody>
				{isLoading ? (
					<Flex
						w={'100%'}
						justifyContent={'center'}
						alignItems={'center'}>
						<Spinner />
					</Flex>
				) : (
					<Wrap
						spacing={12}
						w={'100%'}
						overflowX={{
							base: 'auto',
							md: 'hidden',
						}}>
						{data.map(
							(course: {
								id: React.Key | null | undefined;
								course_students: any[];
								name:
									| string
									| number
									| boolean
									| React.ReactElement<
											any,
											| string
											| React.JSXElementConstructor<any>
									  >
									| React.ReactFragment
									| React.ReactPortal
									| Iterable<React.ReactNode>
									| null
									| undefined;
								type: any;
							}) => {
								const courseStudents =
									expand.isExpanded &&
									expand.courseId === course.id
										? course.course_students
										: course.course_students.slice(
												0,
												MAX_VISIBLE,
										  );

								return (
									<Flex
										key={course.id}
										direction={'column'}
										gap={4}
										w={'100%'}>
										<Heading
											size={'md'}
											display={'flex'}
											justifyContent={'space-between'}>
											{course.name} -{' '}
											{t(course.type) as string}
											{course?.course_students?.length >
												MAX_VISIBLE && (
												<IconButton
													aria-label={'Expand'}
													icon={<BsThreeDots />}
													onClick={() =>
														handleExpand(
															course.id as number,
														)
													}
												/>
											)}
										</Heading>
										<Table>
											<Thead>
												<Tr>
													<Th>{t('gradebookID')}</Th>
													<Th>Student</Th>
													<Th>{t('studentEmail')}</Th>
												</Tr>
											</Thead>
											<Tbody>
												{courseStudents.map(
													(student) => {
														return (
															<Tr
																key={`${student.gradebook_id}-${course.id}`}>
																<Td>
																	{
																		student.gradebook_id
																	}
																</Td>
																<Td>
																	{
																		student
																			.gradebook
																			.person
																			.first_name
																	}{' '}
																	{
																		student
																			.gradebook
																			.person
																			.last_name
																	}
																</Td>
																<Td>
																	{
																		student
																			.gradebook
																			.person
																			.contact
																			.email
																	}
																</Td>
															</Tr>
														);
													},
												)}
											</Tbody>
										</Table>
									</Flex>
								);
							},
						)}
					</Wrap>
				)}
			</CardBody>
		</Card>
	);
};
