import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    //validation for web page should have a .colum
    name: yup.string().required({name: 'Webpage Name is required'}),
    url: yup.string().required({url: 'Website Ur; is required'}),
    status: yup.string().required({status: 'Status is required'})

});

export default schema;
