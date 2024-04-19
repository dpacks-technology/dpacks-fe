import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/AddBlockListValidation";
import FormItem from "antd/es/form/FormItem";
import { AddToBlocklist } from "@/services/BlockPagesService";

const AddToBlockList = ({...props}) => {


    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [url, setUrl] = React.useState("");
   

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addBlock = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {url};

            //validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddToBlocklist(data).then((response) => {
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
                            label={"Url"}
                            type="text" placeholder="Webpage url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            status={error.url ? "error" : ""}
                            error={error.url}
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
                        addBlock().then(() => {
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

export default AddToBlockList;