import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/SiteEditValidation";
import FormItem from "antd/es/form/FormItem";
import {useRouter} from 'next/navigation'
import {EditSiteService, GetSiteByIdService} from "@/services/SitesService";

const EditWebProjectForm = ({...props}) => {

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

    // edit webpage function
    const editSite = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name: name, description: description};

            // validate
            await schema.validate(data, {abortEarly: false});

            // edit webpage // TODO: change the function
            await EditSiteService(props.webId, data).then(() => {
                // props.refreshData("success", "Saved"); // refresh data with success message
                // props.onClose(); // close modal
                // router.push(`/u`);
                window.location.href = "/u";
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
        // get webpage by id from backend function
        GetSiteByIdService(props.webId).then((response) => {
            setName(response.name);
            setDomain(response.domain);
            setDescription(response.description);
        }).catch((error) => {
            Message("error", error.response.data.error);
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <h1 className={"text-gray-500"}>Domain: {domain}</h1>
                    </FormItem>
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
                        editSite().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Updating..." : "Update"}
                    </Button>

                </div>
            </Form>
        </>
    );
}

export default EditWebProjectForm;