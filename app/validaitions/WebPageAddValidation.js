import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required({name: 'Name is required'}).min(3, {name: 'Name must be at least 3 characters'}).max(30, {name: 'Name cannot exceed 30 characters'}),
    path: yup.string().required({path: 'Path is required'}),
    webId: yup.string().required({webId: 'Web ID is required'})
});

export default schema;
