'use client';

import {Button, CheckboxGroup, Checkbox} from "@nextui-org/react";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/TemplateAddValidation";
import FormItem from "antd/es/form/FormItem";
import {getActiveTemplates, getByCategory} from "@/services/MarketplaceService";


const TemplateFilterForm = (...props) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [selected, setSelected] = React.useState([""]);

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // add webpage function
    const addFilter = async () => {
        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {selectedCities: selected};

            // validate
            //await schema.validate(data, { abortEarly: false });

            // add webpage // TODO: change the function
            await getByCategory(data).then((response) => {
                props.notificationMessage("success", "Record added"); // refresh data with success message
                props.onClose(); // close modal
            }).catch((error) => {
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {
            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <div className="flex flex-col gap-3">
                            <CheckboxGroup
                                label="Select cities"
                                color="warning"
                                value={selected}
                                onValueChange={setSelected}
                            >
                                <Checkbox value="Travel">Travel</Checkbox>
                                <Checkbox value="Education">Education</Checkbox>
                                <Checkbox value="Food">Food</Checkbox>
                            </CheckboxGroup>
                            <p className="text-default-500 text-small">Selected: {selected.join(" ")}</p>
                        </div>
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
                        color="primary" variant="flat" onPress={addFilter}>
                        {saving ? "Saving..." : "Save"}
                    </Button>

                </div>
            </Form>
        </>
    );
}

export default TemplateFilterForm;