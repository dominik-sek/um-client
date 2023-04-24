const fetchAllGrades = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades`, {
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
const fetchAllGradesByCourse = async (courseId: number) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades/course/${courseId}`, {
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
const fetchAllGradesByStudent = async (gradebookId: number) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades/student/${gradebookId}`, {
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
const fetchAllGradesByTeacher = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades/teacher`, {
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
const deleteGrade = async (gradeId: number) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades/student/${gradeId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});
	return response.json();
};
const addGrade = async (params: {
	gradebookId: number;
	courseId: number;
	grade: number;
}) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			gradebook_id: params.gradebookId,
			course_id: params.courseId,
			grade: params.grade,
		}),
	});
	return response.json();
};
const updateGrade = async (params: { gradeId: number; grade: number }) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades/${params.gradeId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			grade: params.grade,
		}),
	});
	return response.json();
};
const generatePdfByGradebook = async (gradebookId: number) => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/grades/pdf/${gradebookId}`, {
		method: 'GET',
		//get the pdf file
		headers: {
			'Content-Type': 'application/pdf',
		},
		credentials: 'include',
	});
	//open the pdf file
	const file = await res.blob();
	const fileURL = URL.createObjectURL(file);
	window.open(fileURL);
	return res.blob();
};
export {
	fetchAllGrades,
	fetchAllGradesByCourse,
	fetchAllGradesByStudent,
	fetchAllGradesByTeacher,
	deleteGrade,
	addGrade,
	updateGrade,
	generatePdfByGradebook,
};
