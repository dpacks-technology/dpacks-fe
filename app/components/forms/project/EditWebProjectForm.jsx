import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {Form, message, Select} from "antd";
import schema from "@/app/validaitions/SiteEditValidation";
import FormItem from "antd/es/form/FormItem";
import {EditSiteService, GetSiteByIdService} from "@/services/SitesService";

const {Option} = Select;

const EditWebProjectForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});

    const [name, setName] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleChange = (value) => {
        setCategory(value); // Pass the selected value to the parent component
    };

    // edit webpage function
    const editSite = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name: name, description: description, category: category};

            // validate
            await schema.validate(data, {abortEarly: false});

            // edit webpage // TODO: change the function
            await EditSiteService(props.webId, data).then(() => {
                // props.refreshData("success", "Record updated"); // refresh data with success message
                Message("success", "Project updated");
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
            setCategory(response.category);
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
                    <FormItem>
                        <div style={{width: '100%', maxWidth: '400px', margin: '0 auto'}}>
                            <label>Category</label>
                            <Select
                                getPopupContainer={(node) => node.parentNode}
                                className='mt-2'
                                allowClear
                                placeholder={"Select category"}
                                value={category} // Use value instead of defaultValue
                                onChange={handleChange} // Call handleChange function
                                style={{width: '100%'}}
                                status={error.category ? "error" : ""}
                            >
                                <Option value={"Business/Commercial"}>Business/Commercial</Option>
                                <Option value={"Educational"}>Educational</Option>
                                <Option value={"E-commerce"}>E-commerce</Option>
                                <Option value={"Entertainment"}>Entertainment</Option>
                                <Option value={"Portfolio"}>Portfolio</Option>
                                <Option value={"Community"}>Community</Option>
                                <Option value={"News/Media"}>News/Media</Option>
                                <Option value={"Health/Fitness"}>Health/Fitness</Option>
                                <Option value={"Government/Institutional"}>Government/Institutional</Option>
                                <Option value={"Non-profit"}>Non-profit</Option>
                                <Option value={"Travel/Tourism"}>Travel/Tourism</Option>
                                <Option value={"Technology"}>Technology</Option>
                                <Option value={"Food/Cooking"}>Food/Cooking</Option>
                                <Option value={"Fashion/Beauty"}>Fashion/Beauty</Option>
                                <Option value={"Parenting/Family"}>Parenting/Family</Option>
                                <Option value={"Environment/Sustainability"}>Environment/Sustainability</Option>
                                <Option value={"Legal/Financial"}>Legal/Financial</Option>
                                <Option value={"Real Estate"}>Real Estate</Option>
                                <Option value={"Music"}>Music</Option>
                                <Option value={"Religion/Spirituality"}>Religion/Spirituality</Option>
                                <Option value={"Other"}>Other</Option>
                            </Select>
                            {error.category &&
                                <span className={"mt-2 text-danger text-xs"}>{error.category} <br/> </span>
                            }
                        </div>
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