import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    
    url: yup.string().required({url: 'Website Ur; is required'}),
    //check user id is a uuid
    userId: yup.string().required({userId: 'User ID is required'}),

});

export default schema;
