const fetchCourseByGradebook = async (gradebookId: number) => {
	const response = await fetch(`/api/v1/courses/student/${gradebookId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});
	return response.json();
};
const addCourse = async (course: {}) => {
	return await fetch('/api/v1/courses', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(course),
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => console.log(err));
};

const deleteCourse = async (courseId: number) => {
	const response = await fetch(`/api/v1/courses/${courseId}`, {
		method: 'DELETE',
		credentials: 'include',
	});
	if (response.status === 204) {
		return;
	}
	return response.json();
};
const fetchAllCourses = async () => {
	return await fetch('/api/v1/courses', {
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => console.log(err));
};
const fetchStudentsCourses = async () => {
	const response = await fetch(`/api/v1/courses/students`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

	if (response.status === 500) {
		throw new Error('Internal Server Error', { cause: 'SERVER_ERROR' });
	}

	return response.json();
};
const fetchStudentsInCourse = async (courseId: number) => {
	const response = await fetch(`/api/v1/courses/${courseId}/students`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

	if (response.status === 500) {
		throw new Error('Internal Server Error', { cause: 'SERVER_ERROR' });
	}

	return response.json();
};
const updateOneCourse = async (person: {}, courseId: number) => {
	return await fetch(`/api/v1/courses/teacher/${courseId}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(person),
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => console.log(err));
};

export {
	fetchCourseByGradebook,
	fetchAllCourses,
	fetchStudentsCourses,
	fetchStudentsInCourse,
	updateOneCourse,
	addCourse,
	deleteCourse,
};
