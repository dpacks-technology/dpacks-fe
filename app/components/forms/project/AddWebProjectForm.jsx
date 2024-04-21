"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message, Select} from "antd";
import schema from "@/app/validaitions/SiteAddValidation";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from 'next/navigation'
import {AddSiteService} from "@/services/SitesService";

const AddWebProjectForm = ({...props}) => {

    const router = useRouter();

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});

    const [name, setName] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [description, setDescription] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addSite = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, domain, description};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddSiteService(data).then((response) => {
                // props.notificationMessage("success", "Record added"); // refresh data with success message
                // props.onClose(); // close modal
                // push to the next page
                // router.push(`/u`);
                document.location.href = "/u";
            }).then((error) => {
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {
            console.log(validationError.errors)
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
                            label={"Name"}
                            type="text" placeholder="Webpage name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Domain"}
                            type="text" placeholder="Domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            status={error.domain ? "error" : ""}
                            error={error.domain}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Description"}
                            type="text" placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            status={error.description ? "error" : ""}
                            error={error.description}
                        />
                    </FormItem>
                </div>

                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        addSite().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Adding..." : "Add"}
                    </Button>

                </div>
            </Form>
        </>
    )
        ;
}

export default AddWebProjectForm;