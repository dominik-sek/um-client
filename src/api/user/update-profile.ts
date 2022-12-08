export const updateProfile = async (userProfile: {}) => {

  return fetch(process.env.REACT_APP_API_URL + '/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userProfile),
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
