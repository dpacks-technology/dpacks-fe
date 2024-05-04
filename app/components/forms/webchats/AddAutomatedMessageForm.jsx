import { Button } from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, { useState } from "react";
import { Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { addAutoRespond } from "@/services/AutoRespondService";
import { useParams } from "next/navigation";

const AddAutomatedMessageForm = ({ onClose, notificationMessage }) => {
    // state
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const { webId } = useParams();
    const [autorespond, setAutorespond] = useState({
        message: "",
        trigger: "",
        last_updated: new Date().toISOString(),
        status: 0,
        webid: webId,
    });

    // message api
    const [messageApi, contextHolder] = message.useMessage();
    const Message = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // form validation
    const [isFormValid, setIsFormValid] = useState(false);

    // add webpage function
    // add webpage function
    const addWebpage = async () => {
        try {
            // Check if both message and trigger are not empty
            if (autorespond.message.trim() === '' || autorespond.trigger.trim() === '') {
                // If either message or trigger is empty, show error message and return
                Message("error", "Both Message and Trigger are required.");
                return;
            }

            // Get the current date and time
            const currentDate = new Date();
            const last_updated = currentDate.toISOString();

            // Set the last_updated field in the autorespond state
            setAutorespond({ ...autorespond, last_updated });

            // Wait for the state to be updated
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Send the request to the API
            const { data } = await addAutoRespond(autorespond, webId);
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
    };


    // validation rules
    const validateMessages = {
        required: 'This field is required!',
    };

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAutorespond((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setIsFormValid(value.trim() !== '' && autorespond.trigger.trim() !== '');
    };

    // handle trigger change
    const handleTriggerChange = (e) => {
        const { name, value } = e.target;
        setAutorespond((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setIsFormValid(autorespond.message.trim() !== '' && value.trim() !== '');
    };

    return (
        <>
            {contextHolder}
            <Form
                name="add-autorespond-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={addWebpage}
                initialValues={autorespond}
                validateMessages={validateMessages}
            >
                <div>
                    {/* TODO: Change the form */}
                    <FormItem
                        label="Message"
                        name="message"
                        rules={[{ required: true }]}
                    >
                        <Input
                            type="text"
                            placeholder="Message"
                            name="message"
                            value={autorespond.message}
                            onChange={handleInputChange}
                            error={error}
                        />
                    </FormItem>
                    <FormItem
                        label="Trigger"
                        name="trigger"
                        rules={[{ required: true }]}
                    >
                        <Input
                            type="text"
                            placeholder="Trigger"
                            name="trigger"
                            value={autorespond.trigger}
                            onChange={handleTriggerChange}
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
                        disabled={saving || !isFormValid}
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
