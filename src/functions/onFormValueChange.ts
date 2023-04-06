import React from 'react';

function onFormValueChange<T extends HTMLInputElement | HTMLSelectElement>(
	event: React.ChangeEvent<T>,
	fieldName: string,
	formValues: any,
	setFormValues: React.Dispatch<React.SetStateAction<any>>,
	propertyName: string | null = null,
): void {
	const newField = { [fieldName]: event.target.value.trim() };
	if (propertyName) {
		const updatedFormValues = {
			...formValues,
			[propertyName]: { ...formValues[propertyName], ...newField },
		};
		setFormValues(updatedFormValues);
	} else {
		const updatedFormValues = { ...formValues, ...newField };
		setFormValues(updatedFormValues);
	}
}

export default onFormValueChange;
