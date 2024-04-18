import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {Checkbox, Form, message} from "antd";
import schema from "@/app/validaitions/AddAdminValidation";
import FormItem from "antd/es/form/FormItem";
import {editAdmin, getAdminById} from "@/services/AdminManagementService";

const EditAdminForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState("password");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // edit admin function
    const editAdminUser = async () => {

        // set saving
        setSaving(true);

        try {
            // data //
            const data = {
                name:name,
                phone: phone,
                email: email,
                password: password
            };
            //const data

            // validate
            await schema.validate(data, {abortEarly: false});

            // edit admin //
            await editAdmin(props.id, data).then(() => {
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

    // get admin by id
    useEffect(() => {
        // get webpage by id from backend function
        getAdminById(props.id).then((response) => {
            setName(response.name); // set name
            setPhone(response.phone); // Set phone
            setEmail(response.email); // Set email
            setPassword(response.password); // Set password
        }).then(() => {
        });
    }, []);

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
                            type={passwordVisible}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormItem>
                    <FormItem>
                        <Checkbox onChange={(e) =>
                            setPasswordVisible(e.target.checked ? "text" : "password")}>
                            Show Password
                        </Checkbox>
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
                        editAdminUser().then(() => {
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

export default EditAdminForm;