"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useState} from "react";
import {Checkbox, Form, message} from "antd";
import schema from "@/app/validaitions/TransactionAddValidations";
import FormItem from "antd/es/form/FormItem";
import {AddTransaction} from "@/services/BillingService";
//import {useParams} from "next/navigation";


const AddSubscriptionForm = ({...props}) => {

    //get the webid on url usinbg use params
   // const {webId} = useParams();


    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    //const [plan_name, setCompanyName] = useState("");
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
    const [SecurityCode, setSecurityCode] = useState("");
    const [Terms, setTerms] = useState(false);

   // const [isCompanyAvailable, setIsCompanyAvailable] = useState(false);
    // backend validation error message
    
    const [messageApi, contextHolder] = message.useMessage(); // message api

    const paymentMethods = [
        { id: "card", name: "Credit/Debit Card" },
        { id: "bank_transfer", name: "Bank Transfer" }
    ];

    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add Transaction function
    const addTransaction = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {
                company_name: Company,
                street_no: streetNo,
                city: City,
                postal_code: PostalCode,
                country: Country,
                email: Email,
                payment_method: PaymentMethod,
                given_name: GivenName,
                last_name: LastName,
                month: Month,
                year: Year,
                cvv: SecurityCode,
                terms: Terms,
                card_no: CardNo,
            };

            console.log(data);


            // validate
            await schema.validate(data, {abortEarly: false});

            // add transaction // TODO: change the function
            await AddTransaction(data).then((response) => {
                console.log(response)
                // props.notificationMessage("success", "Record added"); // refresh data with success message
                // props.onClose(); // close modal
            }).then((error) => {
                console.log(error)
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {
            //console.log(validationError.errors)
            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            console.log(errorsObject)
            setError(errorsObject);
        }

    }



    return (
        <>
            {contextHolder}
                <Form>
                    {/* Billing Details */}
                    <div>
                        <h2>Billing Details</h2>

                        <div className="flex flex-wrap gap-4">
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
                                    label={"Country:"}
                                    type="text"
                                    placeholder="Country"
                                    value={Country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    status={error.Country ? "error" : ""}
                                    error={error.Country}
                                />
                            </FormItem>

                            {/*<FormItem>*/}
                            {/*    <label htmlFor="country">Country</label>*/}
                            {/*    <select*/}
                            {/*        id="country"*/}
                            {/*        value={country}*/}
                            {/*        onChange={(e) => setCountry(e.target.value)}*/}
                            {/*    >*/}
                            {/*        <option value="">Select Country</option>*/}
                            {/*        {countries.map((country) => (*/}
                            {/*            <option key={country.code} value={country.code}>*/}
                            {/*                {country.name}*/}
                            {/*            </option>*/}
                            {/*        ))}*/}
                            {/*    </select>*/}
                            {/*</FormItem>*/}

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


                        </div>
                    </div>

                    {/* Payment Details */}
                    <div>
                        <h2>Card Details</h2><br/>

                        <FormItem>
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                value={PaymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                {paymentMethods.map((method) => (
                                    <option key={method.id} value={method.id}>
                                        {method.name}
                                    </option>
                                ))}
                            </select>
                        </FormItem>

                        <FormItem>
                            <Input
                                label={"Card Number"}
                                type="text"
                                placeholder="Card Number"
                                value={CardNo}
                                onChange={(e) => setCardNo(e.target.value)}
                                status={error.CardNo ? "error" : ""}
                                error={error.CardNo}
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
                                    placeholder="CVV"
                                    value={SecurityCode}
                                    onChange={(e) => setSecurityCode(e.target.value)}
                                    status={error.SecurityCode ? "error" : ""}
                                    error={error.SecurityCode}
                                />
                            </FormItem>

                            <FormItem>
                                <Checkbox
                                    label="I agree to the terms and conditions"
                                    checked={Terms}
                                    onChange={(e) => setTerms(e.target.checked)}
                                    status={error.Terms ? "error" : ""}
                                    error={error.Terms}
                                />
                            </FormItem>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className={"mt-6 mb-3 flex gap-3 justify-end"}>
                        {/* close button */}
                        <Button color="danger" variant="flat" onPress={props.onClose}>
                            Back
                        </Button>

                        {/* save button */}
                        <Button
                            disabled={saving}
                            color="primary"
                            variant="flat"
                            onPress={() => {
                                addTransaction().then(() => {
                                    setSaving(false);
                                });
                            }}
                        >
                            {saving ? "Saving..." : "Subscribe"}
                        </Button>
                    </div>
                </Form>

        </>
    );
}

export default AddSubscriptionForm;