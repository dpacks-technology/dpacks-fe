'use client'

import {Button} from "@nextui-org/react";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/TemplateAddValidation";
import FormItem from "antd/es/form/FormItem";
import { Rate } from 'antd';
import {AddRating} from "@/services/MarketplaceService";
import Input from "@/app/components/Input";

const AddRatingsForm = ({id, templateId, ...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [rating, setRating] = React.useState("");
    //const [id, setTemplateId] = React.useState("");


    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addRating = async () => {
        // set saving
        setSaving(true);

        console.log(rating);

        try {
            // data // TODO: add/change fields
            const data = {rating: parseInt(rating),  id: parseInt(templateId)};

            console.log(id);


            // validate
            //await schema.validate(data, { abortEarly: false });

            // add webpage // TODO: change the function
            await AddRating(data).then((response) => {
                console.log(response)
                //props.notificationMessage("success", "Record added"); // refresh data with success message
                //props.onClose(); // close modal
            }).then((error) => {
                //Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {

            console.log(validationError);

            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        }
    };


    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <Rate defaultValue={0} onChange={(value) => setRating(value)} />
                    </FormItem>
                </div>

                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* close button */}
                    <Button color="danger" variant="flat" onPress={props.onClose}>
                        Close
                    </Button>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        addRating().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Saving..." : "Save"}
                    </Button>

                </div>
            </Form>
        </>
    );
}

export default AddRatingsForm;