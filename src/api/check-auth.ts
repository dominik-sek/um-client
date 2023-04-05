export const checkAuth = async () => {
	return await fetch(`${import.meta.env.VITE_API_URL}/api/v1/check-auth`, {
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => console.log(err));
};
