export const logoutUser = async () =>{
    const response = await fetch('api/v1/logout',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
    });
    return response.json();
}