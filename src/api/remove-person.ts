export const removePerson = async (params: { userId: number }) => {
  const response = await fetch(`/api/v1/users/${params.userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status === 204) {
    return;
  } else if (response.status === 500) {
    throw new Error('Internal Server Error', { cause: 'SERVER_ERROR' });
  }
};