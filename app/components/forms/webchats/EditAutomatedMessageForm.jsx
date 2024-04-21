import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {editAutoResponds, getAutoRespondsById} from "@/services/AutoRespondService";
import {Form, message} from "antd";
import schema from "@/app/validaitions/AutomatedMessageEditValidation";
import FormItem from "antd/es/form/FormItem";
import {useParams} from "next/navigation";

const EditAutomatedMessageForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [messageValue, setMessageValue] = React.useState("");
    const [trigger, setTrigger] = React.useState("");
    const { webId } = useParams()

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // edit webpage function
    const editAutomatedMessage = async () => {
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = { message: messageValue, trigger: trigger };

            // validate
            await schema.validate(data, { abortEarly: false });

            // edit webpage
            await editAutoResponds(props.id, data,webId);
            props.refreshData("success", "Saved"); // refresh data with success message
            setSaving(false);
            props.onClose(); // close modal

        } catch (validationError) {
            // set error
            let errorsObject = {};
            validationError.errors &&
            validationError.errors.map((obj) => {
                errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0];
            });
            setError(errorsObject);
            setSaving(false);
        }
    };

    // get webpage by id
    useEffect(() => {
        // get webpage by id from backend function
        getAutoRespondsById(props.id,webId).then((response) => {
            setMessageValue(response.message);
            setTrigger(response.trigger)// set name
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <Input
                        status={error.message ? "error" : ""}
                        error={error.message}
                        label={"Message"}
                        type="text" placeholder="Message"
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                    />
                    <FormItem>
                        <Input
                            status={error.trigger ? "error" : ""}
                            error={error.trigger}
                            label={"Trigger"}
                            type="text" placeholder="Trigger"
                            value={trigger}
                            onChange={(e) => setTrigger(e.target.value)}
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
                        color="primary"
                        variant="flat"
                        onPress={() => {
                            editAutomatedMessage(props.id).then(() => {
                                setSaving(false);
                            });
                        }}
                    >
                        {saving ? "Saving..." : "Save"}
                    </Button>

                </div>
            </Form>
        </>
    );
}

export default EditAutomatedMessageForm;