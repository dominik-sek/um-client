export const addNewPerson = async (params: { userProfile: {} }) => {
  const response = await fetch(`/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params.userProfile),
    credentials: 'include',
  });

  if (response.status === 201) {
    return response.json();
  } else if (response.status === 500) {
    throw new Error('Internal Server Error', { cause: 'SERVER_ERROR' });
  }
};