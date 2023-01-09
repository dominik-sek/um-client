export const loginUser = async (username:string,password:string) =>{
    const response = await fetch('api/v1/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username,
            password,
        }),
    });
    return response.json();
}