
export const logoutUser = async () =>{
  const url = `${process.env.NEXT_PUBLIC_API_URL}/logout`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  })
    .then(
      (response) => {
        if (response.status === 200)
        {

          return Promise.resolve()
        } else {
          return Promise.reject('Something went wrong')
        }
      })

}
