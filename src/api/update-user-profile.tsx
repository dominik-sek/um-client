export const updateUserProfile = async (userProfile: {}, userId: number) => {
  return fetch(`/api/v1/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userProfile),
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};