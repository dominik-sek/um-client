export const fetchProfile = async () =>{
  return fetch(process.env.REACT_APP_API_URL+'/profile', {
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
    .catch((error) => {
      console.error('Error:', error);
    })
}
