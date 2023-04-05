export const checkAuth = async () => {
	return await fetch('/api/v1/check-auth', {
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => console.log(err));
};
