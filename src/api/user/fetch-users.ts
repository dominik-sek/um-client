export const fetchUsers = async () => {
  return await fetch(process.env.REACT_APP_API_URL + '/user/all',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',

    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {

    });

};