const fetchAllUsers = async () => {
  return await fetch('/api/v1/users/', {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
};
const updateUserProfile = async (params: { userProfile: {}, userId: number }) => {
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
const removePerson = async (params: { userId: number }) => {
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
const fetchUserProfile = async () => {

  const response = await fetch('/api/v1/users/profile', {

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
const changeUserAvatar = async (avatar_url: string) => {
  const response = await fetch('/api/v1/users/profile/avatar', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      avatar_url,
    }),
  });
  if (response.status === 500) {
    throw new Error('Internal Server Error', { cause: 'SERVER_ERROR' });
  }
};

const addNewPerson = async (params: { userProfile: {} }) => {
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
export {
  fetchAllUsers,
  updateUserProfile,
  removePerson,
  fetchUserProfile,
  changeUserAvatar,
  addNewPerson,
};