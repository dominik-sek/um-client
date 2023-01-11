export const fetchAllUsers = async () => {
    return await fetch('/api/v1/users/', {
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
}