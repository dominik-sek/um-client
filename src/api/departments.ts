const getAllDepartments = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/departments`, {
		method: 'GET',
		credentials: 'include',
	});
	return response.json();
};
const getOneDepartment = async (id: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/departments/${id}`, {
		method: 'GET',
		credentials: 'include',
	});
	return response.json();
};
const createDepartment = async (department: {}) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/departments`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(department),
	});
	return response.json();
};
const updateDepartment = async (id: string, department: {}) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/departments/${id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(department),
	});
	return response.json();
};
const deleteDepartment = async (id: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/departments/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	});
	if (response.status === 204) {
		return;
	}
	return response.json();
};

export {
	getAllDepartments,
	getOneDepartment,
	createDepartment,
	updateDepartment,
	deleteDepartment,
};
