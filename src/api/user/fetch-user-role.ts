export const fetchUserRole = async () =>{
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/checkauth',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',

    })
    .then((response) => response.json())
    .then((data) => {
      return Promise.resolve(data)
    })

}