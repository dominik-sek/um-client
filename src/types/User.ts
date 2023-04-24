import {
	account_images,
	address,
	contact,
	course,
	faculty,
	library_access,
	person,
	personal,
} from '@prisma/client';

export type UserData = person & {
	account: {
		username: string;
		account_images: account_images;
		last_login: Date;
	};
	contact: contact;
	address: address;
	personal: personal;
	library_access: library_access;
	faculty: faculty;
	gradebook: {
		gradebook_id: number;
		course: course;
		semester: string;
		department_students: {
			department: {
				department_id: number;
				study_type: string;
				name: string;
				degree: string;
				faculty: faculty;
			};
		};
	};
	course: course[];
	id: number;
	[key: string]: any; // Index signature to allow access to any property via a string key
};
