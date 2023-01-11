export const changeUserAvatar = async (avatar_url: string) => {
    //using put method
    const response = await fetch('/api/v1/users/profile/avatar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            avatar_url
        })
    });
    if (response.status === 500) {
        throw new Error('Internal Server Error', {cause: 'SERVER_ERROR'});
    }
}