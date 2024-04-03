"use client"
import { Button } from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import { Form, message } from "antd";
import schema from "@/app/validaitions/WebPageAddValidation";
import FormItem from "antd/es/form/FormItem";
import { CreateNewAlert } from "@/services/AlertService";
import { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { content } from "@/tailwind.config";
import { Flex, Radio } from 'antd';
import { useParams } from "next/navigation";
import BasicDatePicker from "../../DatePicker";

const items = [
    {
        key: '1',
        label:
            "Daily",
    },
    {
        key: '2',
        label:
            "Weekly"
        ,
    },
    {
        key: '3',
        label:
            "Monthly"
        ,
    },
];


const CreateAlertForm = ({ ...props }) => {


    const { webId } = useParams();

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    // const [name, setName] = React.useState("");
    // const [path, setPath] = React.useState("");
    // const [webId, setWebId] = React.useState("");
    const [Threshold, setThreshold] = React.useState(0);
    const [Subject, setSubject] = React.useState("");
    const [Content, setContent] = React.useState("");
    const [AlertOn, setAlertOn] = React.useState("a");
    const [Repeat, setRepeat] = React.useState(1);



    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const AddAlert = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = { Threshold, Subject, Content, AlertOn, Repeat,webId};

            // validate
            //await schema.validate(data, { abortEarly: false });

            // add webpage // TODO: change the function
            await CreateNewAlert(data).then((response) => {
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
                            label={"Alert Threshold"}
                            type="number" placeholder="Alert Threshold"
                            value={Threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Alert Subject"}
                            type="text" placeholder="Alert Subject"
                            value={Subject}
                            onChange={(e) => setSubject(e.target.value)}
                            status={error.path ? "error" : ""}
                            error={error.path}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            label={"Alert Content"}
                            type="text" placeholder="Alert Content"
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                            status={error.webId ? "error" : ""}
                            error={error.webId}
                        />
                    </FormItem>



                    <FormItem>
                        <label className="text-xs" htmlFor="">When Alert Required</label>
                        <br />

                        <Radio.Group defaultValue="a" buttonStyle="solid" onChange={(e) => setAlertOn(e.target.value)} // added this line
                            value={AlertOn} // added this line
                        >

                            <Radio.Button value="a">Immediate</Radio.Button>
                            <Radio.Button value="b">Before</Radio.Button>

                        </Radio.Group>
                    </FormItem>
                    <FormItem>
                        <Dropdown
                            menu={{
                                items,
                                onClick: ({ key }) => setRepeat(key)
                            }}
                            placement="bottom"
                        >
                            <Button>{Repeat || 'Repeat On'}</Button>
                        </Dropdown>
                    </FormItem>

                    <br />
                    <br />




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
                            AddAlert().then(() => {
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

export default CreateAlertForm;