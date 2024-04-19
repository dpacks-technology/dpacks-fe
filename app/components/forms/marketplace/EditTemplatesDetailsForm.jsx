import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {editTemplate, getTemplateById} from "@/services/MarketplaceService";
import {Form, message} from "antd";
import schema from "@/app/validaitions/TemplatesDEditValidation";
import FormItem from "antd/es/form/FormItem";

const EditTemplateDetailsForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [dmessage, setDMessage] = React.useState("");
    //const [price, setPrice] = React.useState(null);

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // edit webpage function
    const editTemplateD = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {
                description: description,
                category: category,
                dmessage: dmessage,
                // //price: price,
            }


            // validate
            await schema.validate(data, {abortEarly: false});

            // edit webpage // TODO: change the function
            await editTemplate(props.id, data).then(() => {
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

    // get webpage by id
    useEffect(() => {
        // get webpage by id from backend function // TODO: change the function
        getTemplateById(props.id).then((response) => {
            //setName(response.name);
            setDescription(response.description);
            setCategory(response.category);
            setDMessage(response.dmessage);
            //setPrice(response.price);// set name
        }).then(() => {
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    {/*<FormItem>*/}
                    {/*    <Input*/}
                    {/*        status={error.name ? "error" : ""}*/}
                    {/*        error={error.name}*/}
                    {/*        label={"Template Name"}*/}
                    {/*        type="text" placeholder="Template name"*/}
                    {/*        value={name}*/}
                    {/*        onChange={(e) => setName(e.target.value)}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}

                    <FormItem>
                        <Input
                            status={error.description ? "error" : ""}
                            error={error.description}
                            label={"Template Description"}
                            type="text" placeholder="Template Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            status={error.category ? "error" : ""}
                            error={error.category}
                            label={"Template Category"}
                            type="text" placeholder="Template Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            status={error.dmessage ? "error" : ""}
                            error={error.dmessage}
                            label={"Developer Message"}
                            type="text" placeholder="Developer Message"
                            value={dmessage}
                            onChange={(e) => setDMessage(e.target.value)}
                        />
                    </FormItem>

                    {/*<FormItem>*/}
                    {/*    <Input*/}
                    {/*        status={error.price ? "error" : ""}*/}
                    {/*        error={error.price}*/}
                    {/*        label={"Price"}*/}
                    {/*        type="text" placeholder="Price"*/}
                    {/*        value={price}*/}
                    {/*        onChange={(e) => setPrice(e.target.value)}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}

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
                        editTemplateD().then(() => {
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

export default EditTemplateDetailsForm;