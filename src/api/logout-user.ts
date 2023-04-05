export const logoutUser = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/logout`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};
