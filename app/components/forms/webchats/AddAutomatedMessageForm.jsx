import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useState} from "react";
import {Form, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import { addAutoRespond } from "@/services/AutoRespondService";

const AddAutomatedMessageForm = ({onClose, notificationMessage}) => {

    // state
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [autorespond, setAutorespond] = useState({
        message: "",
        trigger: "",
        last_updated: new Date().toISOString(),
        status: 0,
    });

    // message api
    const [messageApi, contextHolder] = message.useMessage();
    const Message = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // add webpage function
    const addWebpage = async () => {
        try {
            // Get the current date and time
            const currentDate = new Date();
            const last_updated = currentDate.toISOString();

            // Set the last_updated field in the autorespond state
            setAutorespond({ ...autorespond, last_updated });

            // Wait for the state to be updated
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Send the request to the API
            const { data } = await addAutoRespond(autorespond);
            notificationMessage("success", "Record added");
            onClose();
        } catch (error) {
            // Handle the error
            if (error.response && error.response.data && error.response.data.error) {
                Message("error", error.response.data.error);
            } else {
                Message("error", "An error occurred while adding the record.");
            }
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
                            type="text" placeholder="Message"
                            value={autorespond.message}
                            onChange={(e) => setAutorespond({...autorespond, message: e.target.value})}
                            error={error}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Trigger"}
                            type="text" placeholder="Trigger"
                            value={autorespond.trigger}
                            onChange={(e) => setAutorespond({...autorespond, trigger: e.target.value})}
                            error={error}
                        />
                    </FormItem>

                </div>

                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* close button */}
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary"
                        variant="flat"
                        onPress={() => {
                            addWebpage().then(() => {
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

export default AddAutomatedMessageForm;