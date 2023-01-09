export const checkAuth = async () =>{
    const response = await fetch('api/v1/check-auth',{
        credentials:'include',
    });
    return response.json();
}