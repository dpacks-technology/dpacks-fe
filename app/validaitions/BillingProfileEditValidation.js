import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields

    street_no: yup.string().required({streetNo: 'StreetNo is required'}),
    city: yup.string().required({City: 'City is required'}),
    postal_code: yup.string().required({PostalCode: 'PostalCode is required'}),
    country: yup.string().required({Country: 'Country is required'}),
    email: yup.string().email({Email:'Invalid email format'}).required({Email: 'Email is required'}) ,
    given_name: yup.string().required({GivenName: 'GivenName is required'}),
    month: yup.number().integer().min(1,{month: 'Month must be between 1 and 12'} ).max(12, {month:'Month must be between 1 and 12'}).required({month: 'Month is required'}),
    year: yup.number().integer().min(new Date().getFullYear(), {year:'Year must be the current year or later'}).required({year: 'Year is required'}),
    card_number: yup.string().required({card_number:'Card number is required'}).length(16,{ card_number:'Card number must be exactly 16 digits'}),
    cvv: yup.string().matches(/^\d{3,4}$/, {cvv:'CVV must be 3 or 4 digits'}).required({cvv:'CVV is required'}),




});

export default schema;
