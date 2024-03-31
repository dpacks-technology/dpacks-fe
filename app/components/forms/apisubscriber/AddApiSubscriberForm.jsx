import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/ApiSubscriberAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddApiSubscriber} from "@/services/ApiManagementService";

const AddApiSubscriberForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [user_id, setUserId] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addApiSubscriber = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {user_id};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddApiSubscriber(data).then((response) => {
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
                            label={"UserID"}
                            type="text" placeholder="User Id"
                            value={user_id}
                            onChange={(e) => setUserId(e.target.value)}
                            status={error.user_id ? "error" : ""}
                            error={error.user_id}
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
                        addApiSubscriber().then(() => {
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

export default AddApiSubscriberForm;