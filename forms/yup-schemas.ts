import * as yup from 'yup';
import { useTranslation, Translation } from 'react-i18next';


function peselValidation(pesel: string | undefined): boolean {
  if (!pesel || pesel.length !== 11) {
    return false;
  }

  let year = parseInt(pesel.substr(0, 2));
  if (year >= 20) {
    //check for people born after 2000
    let sum = 0;
    const controlNumber = parseInt(pesel[10]);

    // check the birth date
    year = parseInt('20' + pesel.substr(0, 2));
    const month = parseInt(pesel.substr(2, 2));
    const day = parseInt(pesel.substr(4, 2));

    if (year < 2000 || year > 2199 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    // calculate the control number
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }
    const calculatedControlNumber = (10 - sum % 10) % 10;
    return controlNumber === calculatedControlNumber;
  } else {
    //check for people born before 2000
    let sum = 0;
    const controlNumber = parseInt(pesel[10]);

    // calculate the control number
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }
    let calculatedControlNumber = 10 - (sum % 10);
    calculatedControlNumber = calculatedControlNumber === 10 ? 0 : calculatedControlNumber;

    return controlNumber === calculatedControlNumber;
  }
}

const personalSchema = yup.object().shape({
  first_name: yup.string().min(3, 'First name must be at least 3 characters long').required('First name is required'),
  last_name: yup.string().min(3, 'Last name must be at least 2 characters long').required('Last name is required'),
  date_of_birth: yup.date().nullable().typeError('Invalid Date'),
  pesel: yup
    .string()
    .max(11, 'PESEL must be 11 characters long')
    .test('pesel', 'Invalid PESEL', peselValidation)
    .required('PESEL is required'),
  gender: yup.string().required('Gender is required').typeError('Invalid gender'),
  role: yup.string().required('Role is required').typeError('Invalid role'),
  disabled: yup.boolean().required('Select disability status').typeError('Invalid value'),
  married: yup.boolean().required('Martial status is required').typeError('Invalid value'),
});

const addressContactSchema = yup.object().shape({
  city: yup.string().min(3, 'City must be at least 3 characters long').required(),
  state: yup.string().min(3, 'State must be at least 3 characters long').required(),
  country: yup.string().matches(/^[A-Z]{2}$/, 'Country code must be exactly 2 charaters long').required(),
  postal_code: yup.string().matches(/^[0-9]{2}-[0-9]{3}$/, 'Invalid postal code'),
  street: yup.string().required(),
  email: yup.string().email().required(),
  phone_number: yup.string().required().matches(/^[0-9]{9}$/, 'Phone number must be exactly 9 digits long'),
});
const passwordChangeSchema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters long').required(),
  password_confirmation: yup.string().test('passwords-match', 'Passwords must match', function(value) {
    return this.parent.password === value;
  }),
});

const addDepartmentSchema = yup.object().shape({
    name: yup.string().min(3, 'Department name must be at least 3 characters long').required(),
    length: yup.number().min(1).max(10).required(),
    studyType: yup.string().required(),
    degree: yup.string().required(),
    faculty: yup.string().required(),
})
const addFacultySchema = yup.object().shape({
    name: yup.string().required(),
    person: yup.string().required(),
})

export {
  personalSchema,
  addressContactSchema,
  passwordChangeSchema,
  addDepartmentSchema,
  addFacultySchema
};