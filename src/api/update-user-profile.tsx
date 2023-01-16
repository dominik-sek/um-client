export const updateUserProfile = async (params: { userProfile: {}, userId: number }) => {
  const response = await fetch(`/api/v1/users/${params.userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params.userProfile),
    credentials: 'include',
  });

  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Something went wrong');
};