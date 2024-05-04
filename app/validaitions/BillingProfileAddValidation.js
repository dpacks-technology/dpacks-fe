import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields

    street_no: yup.string().required({streetNo: 'StreetNo is required'}),
    city: yup.string().required({City: 'City is required'}),

    //validate postal code

    postal_code: yup.string().required({PostalCode: 'PostalCode is required'}),
    country: yup.string().required({Country: 'Country is required'}),
    email: yup.string().required({Email: 'Email is required'}).email({Email:'Invalid email format'}) ,
    given_name: yup.string().required({GivenName: 'GivenName is required'}),
    month: yup.number().integer().required({Month: 'Month is required'}).min(1,{Month: 'Month must be between 1 and 12'} ).max(12, {month:'Month must be between 1 and 12'}),
    year: yup.number().integer().required({year: 'Year is required'}).min(new Date().getFullYear(), {year:'Year must be the current year or later'}),
    card_number: yup.string().required({card_number:'Card number is required'}).length(16,{ card_number:'Card number must be exactly 16 digits'}),
    cvv: yup.string().required({cvv:'CVV is required'}).matches(/^\d{3,4}$/, {cvv:'CVV must be 3 or 4 digits'}),

    terms: yup.boolean().oneOf([true], {terms: 'Please accept terms and conditions'}),   // terms checkbox validation



});

export default schema;
