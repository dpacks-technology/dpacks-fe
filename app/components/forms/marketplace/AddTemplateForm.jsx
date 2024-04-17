'use client'

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/TemplateAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddTemplate} from "@/services/MarketplaceService";

const AddTemplateForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setTName] = React.useState("");
    const [description, setTempDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [mainfile, setMainFile] = React.useState("");
    const [thmbnlfile, setThumbnailFile] = React.useState("");
    const [dmessage, setDeveloperMessage] = React.useState("");
    const [price, setTemplatePrice] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addTemplate = async () => {
        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, description, category, mainfile, thmbnlfile, dmessage, price: parseFloat(price)};

            // validate
            await schema.validate(data, { abortEarly: false });

            // add webpage // TODO: change the function
            await AddTemplate(data).then((response) => {
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
    };


    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <Input
                            label={"Template Name"}
                            type="text" placeholder="Template name"
                            value={name}
                            onChange={(e) => setTName(e.target.value)}
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Template Description"}
                            type="text" placeholder="Enter template description"
                            value={description}
                            onChange={(e) => setTempDescription(e.target.value)}
                            status={error.description ? "error" : ""}
                            error={error.description}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Category"}
                            type="text" placeholder="Enter Category: Business, E-commerce, Education, Food, Health etc.."
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            status={error.category ? "error" : ""}
                            error={error.category}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Main File"}
                            type="text" placeholder="Enter the link of your uploaded main file"
                            value={mainfile}
                            onChange={(e) => setMainFile(e.target.value)}
                            status={error.mainfile ? "error" : ""}
                            error={error.mainfile}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Thumbnail Image"}
                            type="text" placeholder="Enter the link of your uploaded thumbnail image"
                            value={thmbnlfile}
                            onChange={(e) => setThumbnailFile(e.target.value)}
                            status={error.thmbnlfile ? "error" : ""}
                            error={error.thmbnlfile}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Developer's Message"}
                            type="text" placeholder="Enter developer's message"
                            value={dmessage}
                            onChange={(e) => setDeveloperMessage(e.target.value)}
                            status={error.dmessage ? "error" : ""}
                            error={error.dmessage}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Price"}
                            type="decimal" placeholder="Price should be between $10-$100"
                            value={price}
                            onChange={(e) => setTemplatePrice(e.target.value)}
                            status={error.price ? "error" : ""}
                            error={error.price}
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
                        addTemplate().then(() => {
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

export default AddTemplateForm;