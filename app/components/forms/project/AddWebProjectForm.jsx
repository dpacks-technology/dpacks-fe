"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message, Select} from "antd";
import schema from "@/app/validaitions/SiteAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddSiteService} from "@/services/SitesService";

const {Option} = Select;

const AddWebProjectForm = ({...props}) => {

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

    // add webpage function
    const addSite = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, domain, description, category};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddSiteService(data).then((response) => {
                // props.notificationMessage("success", "Record added"); // refresh data with success message
                Message("success", "Project created");
                // props.onClose(); // close modal
                // push to the next page
                // router.push(`/u`);

                // redirect after 2 seconds
                setTimeout(() => {
                    document.location.href = "/u";
                }, 1500);

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
                    <FormItem>
                        <div style={{width: '100%', maxWidth: '400px', margin: '0 auto'}}>
                            <label>Category</label>
                            <Select
                                getPopupContainer={(node) => node.parentNode}
                                className='mt-2'
                                allowClear
                                placeholder={"Select category"}
                                // value={category} // Use value instead of defaultValue
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