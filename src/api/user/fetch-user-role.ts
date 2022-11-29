export const fetchUserRole = async () =>{
  return await fetch(process.env.REACT_APP_API_URL + '/checkauth',
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

}