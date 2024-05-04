"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {EditBillingProfile, GetBillingProfileById} from "@/services/BillingService";
import {Checkbox, Form, message} from "antd";
import schema from "@/app/validaitions/BillingProfileEditValidation";
import FormItem from "antd/es/form/FormItem";
import {useState} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import items from "@/app/data/country";

const EditBillingProfileForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [Company, setCompanyName] = useState("");
    const [streetNo, setStreetNo] = useState("");
    const [City, setCity] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [Country, setCountry] = useState("");
    const [Email, setEmail] = useState("");
    const [PaymentMethod, setPaymentMethod] = useState("");
    const [CardNo, setCardNo] = useState("");
    const [GivenName, setGivenName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Month, setMonth] = useState("");
    const [Year, setYear] = useState("");
    const [CVV, setCVV] = useState("");


    //backend  validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api

    const paymentMethods = [
        { id: "credit", name: " Credit" },
        { id: "debit", name: "Debit" }
    ];

    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    //edit billing profile function
    const editBillingProfile = async () => {
        setSaving(true);
        try {
            const data = {
                company_name: Company,
                street_no: streetNo,
                city: City,
                postal_code: PostalCode,
                country: Country,
                email: Email,
                payment_method: PaymentMethod,
                card_number: parseInt(CardNo),
                given_name: GivenName,
                last_name: LastName,
                month: parseInt(Month),
                year: parseInt(Year),
                cvv: parseInt(CVV),

            };

            await schema.validate(data, {abortEarly: false});

            await EditBillingProfile(props.webid, data).then(() => {
                props.refreshData("success", "Saved");
                props.onClose();
            }).then((error) => {
                Message("error", error.response.data.error)
            });

        } catch (validationError) {
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        }
    }

    // get transaction by id
    useEffect(() => {
        // get transaction by id from backend function
        GetBillingProfileById(props.webid).then((response) => {
            console.log(response)
            setCompanyName(response.company_name); // set name
            setStreetNo(response.street_no);
            setCity(response.city);
            setPostalCode(response.postal_code);
            setCountry(response.country);
            setEmail(response.email);
            setPaymentMethod(response.payment_method);
            setCardNo(response.card_number);
            setGivenName(response.given_name);
            setLastName(response.last_name);
            setMonth(response.month);
            setYear(response.year);
            setCVV(response.cvv);


        }).catch((e) => {
            console.log(e);
        });
    }, [props.webid]);

    // const handleTermsChange = (e) => {
    //     setTermsChecked(e.target.checked); // Update the state with the checkbox checked status
    // };

    return (
        <div className={"p-4"}>
            {contextHolder}
            <Form>
                {/* Billing Details */}
                <div>

                    <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>Update Billing Details</h1>
                    <br></br>

                    <div className="flex flex-wrap gap-8">


                    <FormItem>
                            <Input
                                label={"Company Name :"}
                                type="text"
                                placeholder="Company name if availabale"
                                value={Company}
                                onChange={(e) => setCompanyName(e.target.value)}
                                status={error.Company  ? "error" : ""}
                                error={error.Company}
                            />
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"Street No :"}
                                type="text"
                                placeholder="Street No"
                                value={streetNo}
                                onChange={(e) => setStreetNo(e.target.value)}
                                status={error.streetNo ? "error" : ""}
                                error={error.streetNo}
                            />
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"City :"}
                                type="text"
                                placeholder="City"
                                value={City}
                                onChange={(e) => setCity(e.target.value)}
                                status={error.City ? "error" : ""}
                                error={error.City}
                            />
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"Postal Code :"}
                                type="text"
                                placeholder="Postal Code"
                                value={PostalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                status={error.PostalCode ? "error" : ""}
                                error={error.PostalCode}
                            />
                        </FormItem>


                        <FormItem>
                            <Input
                                label={"Email receipt to :"}
                                type="text"
                                placeholder="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                status={error.Email ? "error" : ""}
                                error={error.Email}
                            />
                        </FormItem>

                        <FormItem>
                            <label htmlFor="country" style={{fontSize: '20px'}}> Country </label>
                            <br/>

                            <Select
                                label=" Country"
                                fontSize="32px"
                                className="w-40"
                                value={Country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                {items.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}

                            </Select>
                        </FormItem>


                    </div>
                </div>

                {/* Payment Details */}
                <div>

                    <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>Card Details</h1>
                    <br></br>
                    <FormItem>
                        <label htmlFor="paymentMethod" style={{fontSize: '20px'}}>Payment Method</label>
                        <br/>
                        <Select
                            label="Payment Method"
                            className="w-40"
                            value={PaymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            {paymentMethods.map((method) => (
                                <SelectItem key={method.id} value={method.id}>
                                    {method.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </FormItem>


                    <FormItem>
                        <Input
                            label={"Card Number"}
                            type="text"
                            placeholder="Card Number"
                            value={CardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                            status={error.card_number ? "error" : ""}
                            error={error.card_number}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            label={"Given Name"}
                            type="text"
                            placeholder="Given Name"
                            value={GivenName}
                            onChange={(e) => setGivenName(e.target.value)}
                            status={error.GivenName ? "error" : ""}
                            error={error.GivenName}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            label={"Last Name"}
                            type="text"
                            placeholder="Last Name"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                            status={error.LastName ? "error" : ""}
                            error={error.LastName}
                        />
                    </FormItem>
                    <div className="flex flex-wrap gap-4">
                        <FormItem>
                            <Input
                                label={"Month"}
                                type="integer"
                                placeholder="MM"
                                value={Month}
                                onChange={(e) => setMonth(e.target.value)}
                                status={error.month ? "error" : ""}
                                error={error.month}
                            />
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"Year"}
                                type="integer"
                                placeholder="YYYY"
                                value={Year}
                                onChange={(e) => setYear(e.target.value)}
                                status={error.year ? "error" : ""}
                                error={error.year}
                            />
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"CVV"}
                                type="integer"
                                placeholder="CVV"
                                value={CVV}
                                onChange={(e) => setCVV(e.target.value)}
                                status={error.cvv ? "error" : ""}
                                error={error.cvv}
                            />
                        </FormItem>




                    </div>

                </div>

                {/* Buttons */}
                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        editBillingProfile().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Updating..." : "Update"}
                    </Button>


                </div>
            </Form>

        </div>
    );


}
export default EditBillingProfileForm;