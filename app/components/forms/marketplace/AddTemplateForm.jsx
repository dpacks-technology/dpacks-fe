'use client'

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect, useState} from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/TemplateAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddTemplate} from "@/services/MarketplaceService";
import Dropzone from "@/app/components/Dropzone/Dropzone";
import {Select, SelectItem} from "@nextui-org/react";
import items from "@/app/data/template_categories";
import DropzoneImage from "@/app/components/DropzoneImage/DropzoneImage";


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
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const[imageName, setImageName] = useState(null);

    // set the image name random and timestamp
    const [templateName, setTemplateName] = useState("");
    const [templateThumbName, setTemplateThumbName] = useState("");
    const [randomNumber, setRandomNumber] = useState('');


    const handleImageName = async (data) => {
        console.log(data);
        setImageName(data);
    }

    const handleUploadPercentage = async (data) => {
        console.log(data);
        setUploadPercentage(data);
    }

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add template function
    const addTemplate = async () => {

        // set saving
        setSaving(true);

        console.log(templateName)
        console.log(templateThumbName)

        try {
            // data // TODO: add/change fields
            const data = {name, description, category, mainfile: templateName, thmbnlfile: templateThumbName, dmessage, price: parseFloat(price)};

            // validate
            await schema.validate(data, { abortEarly: false });

            // add template // TODO: change the function
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

    function handleSetTemplateName(name) {
        setTemplateName(name);
    }

    function handleSetTemplateThumbName(name) {
        setTemplateThumbName(name);
    }


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
                        <label htmlFor="category" style={{fontSize: '12px'}}> Category </label>
                        <br/>

                        <Select
                            label="Category"
                            fontSize="32px"
                            className="w-40"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}

                        </Select>

                    </FormItem>
                    <FormItem>
                        <p style={{fontSize: '12px'}}>Upload Template File (.zip formatm )</p>
                        <Dropzone
                            setTemplateName={handleSetTemplateName}
                            uploadPercentageData={handleUploadPercentage} name={"template"} id={"template"}/>
                    </FormItem>
                    <FormItem>
                        <p style={{fontSize: '12px'}}>Upload Template Thumbnail</p>
                        <DropzoneImage
                            SetTemplateThumbName={handleSetTemplateThumbName}
                            uploadPercentageData={handleUploadPercentage} name={"thumbnail"} id={"thumbnail"}/>
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
                            label={"Price in $"}
                            type="decimal" placeholder="Enter the price of the template if any"
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