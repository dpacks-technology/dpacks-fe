import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {editPages, getPageById} from "@/services/userService";
import {Form, message} from "antd";
import schema from "@/app/validaitions/WebPageEditValidation";
import FormItem from "antd/es/form/FormItem";

const EditWebpageForm = ({...props}) => {

    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setName] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const editWebpage = async () => {

        // set saving
        setSaving(true);

        try {
            // data
            const data = {name: name};

            // validate
            await schema.validate(data, {abortEarly: false});

            // edit webpage
            await editPages(props.id, data).then(() => {
                props.refreshData("success", "Saved"); // refresh data with success message
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

    useEffect(() => {

        // set loading
        setLoading(true);

        // get webpage by id
        getPageById(props.id).then((response) => {
            setName(response.name); // set name
            setLoading(false);
        }).then(() => {
            setLoading(false);
        });

    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    <FormItem>
                    <Input
                        status={error.name ? "error" : ""}
                        error={error.name}
                        label={"Name"}
                        type="text" placeholder="Webpage name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </FormItem>
                </div>

                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>
                    <Button color="danger" variant="flat" onPress={props.onClose}>
                        Close
                    </Button>
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        editWebpage().then(() => {
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

export default EditWebpageForm;