const getAllPrintouts = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/printouts`, {
		method: 'GET',
		credentials: 'include',
	});
	return response.json();
};
const addOnePrintout = async (printout: {
	description: string;
	url: string;
}) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/printouts`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(printout),
	});
	return response.json();
};
const deleteOnePrintout = async (id: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/printouts/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	});
	return response.json();
};
export { getAllPrintouts, addOnePrintout, deleteOnePrintout };
