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
    const [ ID, setID] = useState("");
    const [UserID, setUserID] = useState("");
    const [PlanID, setPlanID] = useState("");
    const [PlanName, setPlanName] = useState("");
    const [Amount, setAmount] = useState("");
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
    const [Terms, setTerms] = useState(false);

   const [Status, setStatus] = useState("");



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
               id: parseInt(ID),
                user_id: parseInt(UserID),
                plan_id: parseInt(PlanID),
                plan_name:PlanName,
                amount: parseFloat(Amount),
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
                terms: Terms,
                card_number: parseInt(CardNo),
                status: parseInt(Status),
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
                                    label={"ID :"}
                                    type="integer"
                                    placeholder=" "
                                    value={ID}
                                    onChange={(e) => setID(e.target.value)}
                                    status={error.ID  ? "error" : ""}
                                    error={error.ID}
                                />
                            </FormItem>

                            <FormItem>
                                <Input
                                    label={"UserID :"}
                                    type="integer"
                                    placeholder=" "
                                    value={UserID}
                                    onChange={(e) => setUserID(e.target.value)}
                                    status={error.UserID  ? "error" : ""}
                                    error={error.UserID}
                                />
                            </FormItem>

                            <FormItem>
                                <Input
                                    label={"PlanID :"}
                                    type="integer"
                                    placeholder=" "
                                    value={PlanID}
                                    onChange={(e) => setPlanID(e.target.value)}
                                    status={error.PlanID  ? "error" : ""}
                                    error={error.PlanID}
                                />
                            </FormItem>

                            <FormItem>
                                <Input
                                    label={"PlanName :"}
                                    type="text"
                                    placeholder=" "
                                    value={PlanName}
                                    onChange={(e) => setPlanName(e.target.value)}
                                    status={error.PlanName  ? "error" : ""}
                                    error={error.PlanName}
                                />
                            </FormItem>


                            <FormItem>
                                <Input
                                    label={"Amount :"}
                                    type="decimal"
                                    placeholder=" "
                                    value={Amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    status={error.Amount  ? "error" : ""}
                                    error={error.Amount}
                                />
                            </FormItem>




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
                                    status={error.CVV ? "error" : ""}
                                    error={error.CVV}
                                />
                            </FormItem>

                            {/*<FormItem>*/}
                            {/*    <Checkbox*/}
                            {/*        label={"I agree to the terms and conditions"}*/}
                            {/*        checked={Terms}*/}
                            {/*        onChange={(e) => setTerms(e.target.checked)}*/}
                            {/*        status={error.Terms ? "error" : ""}*/}
                            {/*        error={error.Terms}*/}
                            {/*    />*/}
                            {/*</FormItem>*/}

                            <FormItem>
                                <Input
                                    label={"Terms"}
                                    type="text"
                                    placeholder="Terms"
                                    value={Terms}
                                    onChange={(e) => setTerms(e.target.value)}
                                    status={error.Terms ? "error" : ""}
                                    error={error.Terms}
                                />
                            </FormItem>


                            <FormItem>
                                <Input
                                    label={"Status"}
                                    type="integer"
                                    placeholder="Status"
                                    value={Status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    status={error.Status ? "error" : ""}
                                    error={error.Status}
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
                            color="primary" variant="flat" onPress={() => {
                            addTransaction().then(() => {
                                setSaving(false);
                            });
                        }}>
                            {saving ? "Saving..." : "Purchase"}
                        </Button>



                    </div>
                </Form>

        </>
    );
}

export default AddSubscriptionForm;