const getAllFaculties = async () => {
  const response = await fetch('/api/v1/faculties', {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};
const getOneFaculty = async (id: string) => {
  const response = await fetch(`/api/v1/faculties/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};
const createFaculty = async (faculty: {}) => {
  const response = await fetch('/api/v1/faculties', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faculty),
  });
  return response.json();
};
const updateFaculty = async (id: string, faculty: {}) => {
  const response = await fetch(`/api/v1/faculties/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faculty),
  });
  return response.json();
};
const deleteFaculty = async (id: string) => {
  const response = await fetch(`/api/v1/faculties/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (response.status === 204) {
    return;
  }
  return response.json();
};

export {
  getAllFaculties,
  getOneFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};