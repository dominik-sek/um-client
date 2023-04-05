export const loginUser = async (params: {
	username: string;
	password: string;
}) => {
	const response = await fetch('/api/v1/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	});

	if (response.status === 401) {
		throw new Error('Invalid Credentials', {
			cause: 'INVALID_CREDENTIALS',
		});
	}

	if (response.status === 400) {
		throw new Error('Username and Password are required', {
			cause: 'CREDENTIALS_REQUIRED',
		});
	}

	if (response.status === 500) {
		throw new Error('Internal Server Error', { cause: 'SERVER_ERROR' });
	}

	return response.json();
};
