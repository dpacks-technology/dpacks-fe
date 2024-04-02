import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    path: yup.string().required({path: 'Path is required'}),
    ratelimit: yup.string().required({ratelimit: 'Web ID is required'})

});

export default schema;
