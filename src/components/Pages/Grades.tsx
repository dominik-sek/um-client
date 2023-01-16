import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
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
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { addGrade, deleteGrade, fetchAllGradesByTeacher } from '../../api/grades';
import { useUserStore } from '../../../store';
import DangerModal from '../shared/danger-modal';
import { fetchStudentsCourses } from '../../api/fetch-students-courses';
import { grade, course } from '@prisma/client';

type CourseGrades = {
  grade: GradeWithIndex[];
  id: number;
  name: string;
  type: string;
}
type GradeWithIndex = {
  grade_Id: number;
} & grade;

function GradeMenu(props: { gradebookId: any, courseId: any, handleDelete: () => void }) {

  return (
    <Box gap={2} display={'flex'}>
      <IconButton aria-label={'Delete grade'} colorScheme={'red'} icon={<DeleteIcon />}
                  onClick={props.handleDelete} />
    </Box>
  );
}

const Grades = () => {
  const user = useUserStore((state) => state.user);
  const {
    data: grades,
    isLoading: gradesLoading,
    refetch: refetchGrades,
  } = useQuery('fetchAllGradesByTeacher', fetchAllGradesByTeacher, {
    refetchOnWindowFocus: false,
  });

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [deletedGrade, setDeletedGrade] = React.useState<any>(null);
  const [pickedCourse, setPickedCourse] = React.useState<any>();
  const [pickedUser, setPickedUser] = React.useState<any>();
  const {
    data: courseStudents,
    isLoading: courseStudentsLoading,
  } = useQuery('fetchStudentsCourses', fetchStudentsCourses, {
    refetchOnWindowFocus: false,
  });
  const handleDeleteGrade = (gradeId: number) => {
    setDeletedGrade(gradeId);
    onDeleteOpen();
  };
  const { mutate: deleteGradeMutation } = useMutation(deleteGrade, {
    onSuccess: () => {
      refetchGrades();
      onDeleteClose();
    },
  });
  const { mutate: addGradeMutation } = useMutation(addGrade, {
    onSuccess: () => {
      refetchGrades();
      onAddClose();
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
      courseId: pickedCourse.id,
      grade: gradeRef.current.value,
    });
  };


  const handleCancelAdd = () => {
    setPickedCourse(null);
    setPickedUser(null);
    onAddClose();
  };
  const gradeRef = React.useRef<any>(null);
  const pickCourse = () => {
    return (
      <Menu matchWidth>
        <MenuButton width={'100%'} as={Button} rightIcon={<ChevronDownIcon />}>
          {pickedCourse ? `${pickedCourse.name} - ${pickedCourse.type}` : 'Pick course'}
        </MenuButton>
        <MenuList>
          {
            user.course.map((course) => (
              <MenuItem w={'100%'} key={course.id}
                        onClick={() => setPickedCourse(course)}>{course.name} - {course.type}</MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    );
  };
  const pickUserInCourse = () => {
    return (
      <Menu matchWidth>
        <MenuButton disabled={!pickedCourse} width={'100%'} as={Button} rightIcon={<ChevronDownIcon />}>
          {pickedUser ? `${pickedUser.gradebook.person.last_name} - ${pickedUser.gradebook.gradebook_id}` : 'Pick user'}
        </MenuButton>
        {
          courseStudentsLoading ? <Spinner /> : (
            <MenuList>
              {
                courseStudents.map((course: { course_students: any[]; id: any; }) => (
                  course.course_students.map((student) => {
                    const gradebook = student.gradebook;
                    const person = gradebook.person;
                    if (course.id === pickedCourse?.id) {
                      return (
                        <MenuItem w={'100%'} key={gradebook.gradebook_id}
                                  onClick={() => setPickedUser(student)}>{person.last_name} - {gradebook.gradebook_id}</MenuItem>
                      );

                    }
                  })

                ))
              }
            </MenuList>
          )
        }
      </Menu>
    );
  };
  const editGradeModal = () => {
    return (
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add grade</ModalHeader>
          <ModalBody>
            <FormControl>
              <Text>Grade: </Text>
              <NumberInput defaultValue={2.0} precision={1} min={2.0} max={5.0} step={0.5}>
                <NumberInputField ref={gradeRef} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>Course:</Text>
              <Box width={'100%'}>
                {pickCourse()}
              </Box>
              <Text>Student:</Text>
              {pickUserInCourse()}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={'blue'} mr={3} onClick={onAddClose}>
              Close
            </Button>

            <Button disabled={!pickedCourse || !pickedUser} colorScheme={'green'}
                    onClick={handleSaveGrade}>Save</Button>
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
      <Card w={'100%'}
            bg={useColorModeValue('white', 'gray.800')}
      >
        <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Heading size={'md'}>Grades</Heading>
          <Button colorScheme={'blue'} leftIcon={<AddIcon />} onClick={handleAddGrade}>
            Add grade
          </Button>
        </CardHeader>
        <CardBody
          display={'flex'}
          justifyContent={'center'}
          gap={4}>
          <FormControl>
            {gradesLoading ? <Spinner /> : (
              <Table>
                <Thead>
                  <Tr>
                    <Th>Course name</Th>
                    <Th>Gradebook ID</Th>
                    <Th>Date</Th>
                    <Th>Grade</Th>
                    <Th></Th>
                  </Tr>
                </Thead>


                <Tbody>
                  {
                    grades.map((grade: CourseGrades) =>
                      grade.grade.map((innerGrade: GradeWithIndex) => {
                        console.log(innerGrade);
                        return (
                          <Tr key={innerGrade.entry_time.toString()}>
                            <Td>{grade.name} - {grade.type}</Td>
                            <Td>{innerGrade.gradebook_id}</Td>
                            <Td>{innerGrade.entry_time.toString()}</Td>
                            <Td>{innerGrade.grade}</Td>
                            {user.role !== 'student' && (
                              <Td>
                                <GradeMenu gradebookId={innerGrade.gradebook_id} courseId={innerGrade.course_id}
                                           handleDelete={() => handleDeleteGrade(innerGrade.grade_Id)} />
                              </Td>
                            )}
                          </Tr>
                        );
                      }),
                    )
                  }
                </Tbody>

              </Table>
            )}
          </FormControl>
        </CardBody>
      </Card>
    </Box>
  );

};
export default Grades;