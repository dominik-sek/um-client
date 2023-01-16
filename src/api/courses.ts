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

export {
  fetchCourseByGradebook,
};
