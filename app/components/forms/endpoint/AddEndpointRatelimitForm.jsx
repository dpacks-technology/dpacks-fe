import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Col, Form, InputNumber, message, Row, Slider} from "antd";
import schema from "@/app/validaitions/EndpointAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddRatelimit} from "@/services/EndpointService";


const AddRatelimitForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [path, setPath] = React.useState("");
    const [ratelimit, setRatelimit] = React.useState("");



    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addRatelimit = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {path, ratelimit};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddRatelimit(data).then((response) => {
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
                            label={"Path"}
                            type="text" placeholder="/api"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            status={error.path ? "error" : ""}
                            error={error.path}
                        />
                    </FormItem>
                    <FormItem>
                        <Row className="flex flex-row justify-around">
                            <Col span={15}>
                                <Slider
                                    min={1}
                                    max={60}
                                    onChange={(e)=> setRatelimit(e)}
                                    value={typeof ratelimit === 'number' ? ratelimit : 0}

                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    min={1}
                                    max={20}
                                    value={ratelimit}
                                    onChange={(e)=> setRatelimit(e)}
                                    status={error.ratelimit ? "error" : ""}
                                    error={error.ratelimit}
                                />
                            </Col>
                        </Row>
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
                        addRatelimit().then(() => {
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

export default AddRatelimitForm;