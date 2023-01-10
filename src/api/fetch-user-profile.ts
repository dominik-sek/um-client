export const fetchUserProfile = async () =>{

    const response = await fetch('api/v1/users/profile',{

        method:'GET',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include'

    });

    if(response.status === 500){
        throw new Error('Internal Server Error', {cause: 'SERVER_ERROR'});
    }

    return response.json();

}