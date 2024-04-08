import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/AddAdminValidation";
import FormItem from "antd/es/form/FormItem";
import {AddAdminUser} from "@/services/AdminManagementService";

const AddAdminForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add admin function
    const addAdmin = async () => {

        // set saving
        setSaving(true);

        //const number = parseInt(phone);

        try {
            // data //add/change fields
            const data = {
                name:name,
                phone: parseInt(phone),
                email: email,
                password: password
            };

            // validate
            await schema.validate(data, {abortEarly: false});

            // add admin
            await AddAdminUser(data).then((response) => {
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
                    {/* Name */}
                    <FormItem>
                        <Input
                            status={error.name ? "error" : ""}
                            error={error.name}
                            label={"Name"}
                            type="text" placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            status={error.phone ? "error" : ""}
                            error={error.phone}
                            label={"Phone"}
                            type="text" placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FormItem>

                    {/* Email */}
                    <FormItem>
                        <Input
                            status={error.email ? "error" : ""}
                            error={error.email}
                            label={"Email"}
                            type="email" placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormItem>

                    {/* Password */}
                    <FormItem>
                        <Input
                            status={error.password ? "error" : ""}
                            error={error.password}
                            label={"Password"}
                            type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormItem>

                    {/*/!* Confirm Password *!/*/}
                    {/*<FormItem>*/}
                    {/*    <Input*/}
                    {/*        status={error.password ? "error" : ""}*/}
                    {/*        error={error.password}*/}
                    {/*        label={"Confirm Password"}*/}
                    {/*        type="password" placeholder="Confirm Password"*/}
                    {/*        value={password}*/}
                    {/*        onChange={(e) => setPassword(e.target.value)}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
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
                        addAdmin().then(() => {
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

export default AddAdminForm;