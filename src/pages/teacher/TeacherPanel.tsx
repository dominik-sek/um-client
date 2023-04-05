import { Wrap } from '@chakra-ui/react';

import React from 'react';

import { StudentsInCourseCard } from '../../components/shared/teacher/students-in-course-card';
import { CourseGradesCard } from '../../components/shared/teacher/course-grades-card';
import { TeacherCoursesCard } from '../../components/shared/teacher/teacher-courses-card';

const TeacherPanel = () => {
	return (
		<Wrap flexDir={'column'} spacing={8}>
			<TeacherCoursesCard />
			<CourseGradesCard />
			<StudentsInCourseCard />
		</Wrap>
	);
};
export default TeacherPanel;
