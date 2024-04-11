import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/WebPageAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddWebpage} from "@/services/WebpagesService";
import Textarea from "../../TextArea";
import MultiSelect from "../../SelectwithTag";
import { users } from "../../PersonlizedContent/SIgnUp/data";


const PersonolizedC = ({...props}) => {

    // state
    // state
const [saving, setSaving] = React.useState(false);
const [error, setError] = React.useState({});
const [name, setName] = React.useState("");
const [path, setPath] = React.useState("");
const [webId, setWebId] = React.useState("");
const [description, setDescription] = React.useState("");
const [selectedUsers, setSelectedUsers] = React.useState([]);

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleSelectionChange = (selectedItemNames) => {
        selectedItemNames.pre
        // Assuming 'items' uses 'name' as a unique key; adjust logic if 'id' should be used instead
        const updatedSelection = users.filter(user => selectedItemNames.includes(user.name));
        setSelectedUsers(updatedSelection);
        console.log("Selected Users: ", updatedSelection);
      };


    // add webpage function
    const addWebpage = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, path, webId};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddWebpage(data).then((response) => {
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
                        <Textarea label={"Describe your Self"} placeholder="Tell Me About Your self" />
                    </FormItem>
                    <FormItem>
                        
                    </FormItem>
                    <FormItem className="md:mt-2">
                      
                      <MultiSelect
                        items={users}
                        selectedItems={selectedUsers.map(user => user.name)}
                        onChange={handleSelectionChange}
                        placeholder="Select Categories"
                        labelOutside={true}
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
                        addWebpage().then(() => {
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

export default PersonolizedC;