import {Button} from "@nextui-org/react";
import React, {useEffect} from "react";
import {Col, Form, InputNumber, message, Row, Slider} from "antd";
import schema from "@/app/validaitions/EndpointEditValidation";
import FormItem from "antd/es/form/FormItem";
import {getRatelimitById, EditRatelimit} from "@/services/EndpointService";

const EditRatelimitForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [ratelimit, setRatelimit] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // edit webpage function
    const editRatelimit = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {ratelimit: ratelimit};

            // validate
            await schema.validate(data, {abortEarly: false});

            // edit webpage // TODO: change the function
            await EditRatelimit(props.id, data).then(() => {
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
        // get webpage by id from backend function
        getRatelimitById(props.id).then((response) => {
            setRatelimit(response.ratelimit); // set name
        }).then(() => {
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <Row className="flex flex-row justify-around">
                            <Col span={14}>
                                <Slider
                                    min={0}
                                    max={300}
                                    onChange={(e)=> setRatelimit(e)}
                                    value={typeof ratelimit === 'number' ? ratelimit : 0}

                                />
                            </Col>
                            <Col span={10}>
                                <InputNumber
                                    min={0}
                                    max={300}
                                    placeholder="Rate Per Min"
                                    addonBefore="RPM"
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
                        editRatelimit().then(() => {
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

export default EditRatelimitForm;