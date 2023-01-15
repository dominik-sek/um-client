export const fetchStudentsCourses = async () => {
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