import * as yup from 'yup';

const ProfileValidation = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters')
        .required({firstName: 'First name is required'}),
    lastName: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'Last name can only contain letters')
        .required({lastName: 'Last name is required'}),
    email: yup
        .string()
        .email('Must be a valid email')
        .required({email: 'Email is required'}),
    phoneNumber: yup
        .string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be a valid international format')
        .required({phoneNumber: 'Phone number is required'}),
});

export default ProfileValidation;