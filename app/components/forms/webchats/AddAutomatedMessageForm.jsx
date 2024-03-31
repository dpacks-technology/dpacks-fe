'use client';

import { Button, Form, message } from "antd";
import Input from "@/app/components/Input";
import React from "react";
import schema from "@/app/validaitions/AutomatedMessageAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddAutoResponds} from "@/services/AutoRespondService";


const AddAutoRespondsForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [messages, setMessage] = React.useState("");
    const [trigger, setTrigger] = React.useState("");
    const [status, setStatus] = React.useState("");


    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, messages) => { // message function
        messageApi.open({
            type: type,
            content: messages,
        });
    };



    // add webpage function
    const addAutoRespond = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {message, trigger, status};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddAutoResponds(data).then((response) => {
                props.notificationMessage("success", "Record added"); // refresh data with success message
                props.onClose(); // close modal
            }).then((error) => {
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {
            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        }

    }

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <Input
                            label={"Message"}
                            type="text" placeholder="Automated Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            status={error.message ? "error" : ""}
                            error={error.message}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Trigger"}
                            type="text" placeholder="Trigger"
                            value={trigger}
                            onChange={(e) => setTrigger(e.target.value)}
                            status={error.trigger ? "error" : ""}
                            error={error.trigger}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Status"}
                            type="text" placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            status={error.status ? "error" : ""}
                            error={error.status}
                        />
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
                        addAutoRespond().then(() => {
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

export default AddAutoRespondsForm;