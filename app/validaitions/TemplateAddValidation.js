import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Template Name is required'),
    description: yup.string().required('Template Description is required'),
    category: yup.string().required('Category is required'),
    mainfile: yup.string().required('Main File must be a valid URL'),
    thmbnlfile: yup.string().required('Thumbnail Image must be a valid URL'),
    dmessage: yup.string().required("Developer's Message is required"),
    price: yup.number().typeError('Price must be a number').max(50, 'Price should not exceed $50')
});

export default schema;
