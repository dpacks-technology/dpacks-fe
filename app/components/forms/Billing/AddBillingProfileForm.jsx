"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useState} from "react";
import {Checkbox,Form, message} from "antd";
import schema from "@/app/validaitions/BillingProfileAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddBillingProfile} from "@/services/BillingService";
import items from "@/app/data/country";
import {Select, SelectItem} from "@nextui-org/react";
import {useRouter} from "next/navigation";

const AddBillingProfileForm = ({...props}) => {

    const router = useRouter(); // router

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
    const [termsChecked, setTermsChecked] = useState(true); // State for managing checkbox checked status



    const [messageApi, contextHolder] = message.useMessage(); // message api



    const paymentMethods = [
        { id: "Credit", name: "Credit " },
        { id: "Debit", name: "Debit" }
    ];

    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const [Repeat, setRepeat] = React.useState();

    // add addBillingProfile function
    const addBillingProfile = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {
                web_id: props.webid,
                company_name: Company,
                street_no: streetNo,
                city: City,
                postal_code: PostalCode,
                country: Country,
                email: Email,
                payment_method: PaymentMethod,
                given_name: GivenName,
                last_name: LastName,
                month: parseInt(Month),
                year: parseInt(Year),
                cvv: parseInt (CVV),
                card_number: parseInt(CardNo),

            };

            console.log(data);


            // validate
            await schema.validate(data, {abortEarly: false});

            // add transaction // TODO: change the function
            await AddBillingProfile(data).then((response) => {

                router.push(`./subscription`); // redirect to the page

            }).then((error) => {
                console.log(error)
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {



            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            console.log(errorsObject)
            setError(errorsObject);
        }

    }



    function handleTermsChange() {
        setTermsChecked(!termsChecked); // Update the state with the checkbox checked status
    }

    return (
        <div className={"p-4"}>
            {contextHolder}
            <Form>
                {/* Billing Details */}
                <div>
                    <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>Billing Details</h1>
                    <br></br>
                    <div className="flex flex-wrap gap-8">


                        <FormItem>
                            <Input

                                label={"Company Name "}
                                type="text"
                                placeholder="Company name if availabale"
                                value={Company}
                                onChange={(e) => setCompanyName(e.target.value)}
                                status={error.Company ? "error" : ""}
                                error={error.Company}
                            />
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"Street No "}
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
                                label={"City "}
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
                                label={"Postal Code "}
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
                                label={"Email receipt to "}
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

                <br></br>


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
                                status={error.Month ? "error" : ""}
                                error={error.Month}
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

                        <FormItem>
                        <Checkbox
                            defaultChecked={termsChecked} // Set initial checked status
                            onChange={handleTermsChange} // Handle checkbox change
                        > I Agree to the Terms and Conditions
                        </Checkbox>
                        </FormItem>

                    </div>
                </div>

                {/* Buttons */}
                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        addBillingProfile().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Saving..." : "Save"}
                    </Button>


                </div>
            </Form>

        </div>
    );
}

export default AddBillingProfileForm;

