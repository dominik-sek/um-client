export const fetchUserRole = async () =>{
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/checkauth',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',

    })
  return await res.json()
}