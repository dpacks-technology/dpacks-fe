import * as yup from 'yup';

const form1 = yup.object().shape({
    // TODO: Add validation for the following fields
    firstName: yup.string().required({firstName: 'First Name is required'}).min(3, {firstName: 'Name must be at least 3 characters'}).max(30, {firstName: 'Name cannot exceed 30 characters'}),
    lastName: yup.string().required({lastName: 'Last Name is required'}),
});

export default form1;
