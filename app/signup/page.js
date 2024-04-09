"use client"

import {Form, Select} from "antd";
import FormItem from "antd/es/form/FormItem";
import Input from "@/app/components/Input";
import {Button} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function SignUpPage() {
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("male");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState("password");
    const [isInvalidConfirmPassword, setIsInvalidConfirmPassword] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);


    useEffect(() => {
        if (password !== confirmPassword && confirmPasswordTouched) {
            setIsInvalidConfirmPassword(true);
        } else {
            setIsInvalidConfirmPassword(false);
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //send data to backend using
        try {
            const data = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                date_of_birth: dateOfBirth,
                gender: gender,
                password: password,
            };

            const response = await axios.post(`http://localhost:4010/api/auth/signup`, data);
            if(response.status === 200) {
                console.log("User created successfully");
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const validateFields = () => {
        if(firstName === "" || lastName === "") {
            setError("First Name and Last Name cannot be empty")
        }else{
            setError("");
            setPage(1);
        }
    }

    return (
        <>
            <div className={"w-full con-mid p-6 lg:p-0 overflow-hidden"} style={{minHeight: "100vh"}}>
                <div className={"dark:bg-secondaryDark w-full sm:w-3/4 lg:w-1/2 p-6 lg:p-12 rounded-2xl"}>
                    <div className={"md:grid md:grid-cols-3 md:gap-12"}>
                        <div className={"col-span-1 p-2"}>
                            <div className={"w-full text-left"}>
                                <div className={"md:grid grid-cols-1 md:gap-24"}>
                                    <div>
                                        <img src={"/images/logos/dpacks-logo-white.png"}
                                             className={"w-1/2 sm:w-1/2 md:w-3/4 lg:w-full xl:w-4/5"} alt={"DPacks Logo"}/>
                                        <h1 className={"dark:text-dark mt-3 text-md sm:text-lg mb-3 sm:mb-0"}>Sign in</h1>
                                    </div>
                                    <div className={"hidden md:block"}>
                                        <p style={{fontSize: "10px"}} className={"mb-2"}>
                                            © {new Date().getFullYear()} DPacks. All rights reserved.
                                        </p>
                                        <p style={{fontSize: "9px"}} className={"dark:text-darkSecondary"}>
                                            Static data management and global distribution technology.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-span-2 p-2"}>
                            <Form>
                                {page === 0 ? (
                                    <>
                                        <FormItem className={"md:mt-5"}>
                                            <Input
                                                label={"First Name"}
                                                className={"w-full"}
                                                placeholder={"FirstName"}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                status={error ? "error" : ""}
                                                error={error}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Input
                                                label={"Last Name"}
                                                className={"w-full"}
                                                placeholder={"LastName"}
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                status={error ? "error" : ""}
                                                error={error}

                                            />
                                        </FormItem>
                                        <FormItem>
                                            <div  className="flex flex-row justify-end">
                                                <Button variant={"flat"} color={"primary"} className={"md:w-2/6 w-full"} onClick={() => {
                                                    validateFields();

                                                }}>
                                                    Next
                                                </Button>
                                            </div>


                                        </FormItem>
                                    </>
                                ): page === 1 ? (
                                    <>
                                        <FormItem className="md:mt-2">
                                            <Input
                                                label={"Email"}
                                                className={"w-full"}
                                                placeholder={"Email"}
                                                type={"email"}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Input
                                                label={"Phone"}
                                                className={"w-full"}
                                                placeholder={"Phone"}
                                                type={"text"}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </FormItem>
                                        <FormItem >
                                            <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                                                <Button variant={"flat"} color={"primary"} onClick={() => setPage(0)}>
                                                    Back
                                                </Button>
                                                <Button variant={"flat"} color={"primary"} onClick={() => setPage(2)}>
                                                    Next
                                                </Button>
                                            </div>
                                        </FormItem>
                                    </>
                                ): page === 2 ? (
                                    <>
                                        <FormItem className="md:mt-2">
                                            <Input
                                                label={"Date of Birth"}
                                                className={"w-full"}
                                                placeholder={"Date of Birth"}
                                                type={"date"}
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                            />
                                            <Select
                                                value={gender}
                                                onChange={(value) => setGender(value)}
                                                options={[
                                                    { value: 'male', label: 'Male' },
                                                    { value: 'female', label: 'Female' },
                                                ]}
                                                className="mt-3"
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                                                <Button variant={"flat"} color={"primary"} onClick={() => setPage(1)}>
                                                    Back
                                                </Button>
                                                <Button variant={"flat"} color={"primary"} onClick={() => setPage(3)}>
                                                    Next
                                                </Button>
                                            </div>
                                        </FormItem>
                                    </>

                                ) : page === 3 ? (
                                    <>
                                        <FormItem>
                                            <Input
                                                label={"Password"}
                                                className={"w-full"}
                                                placeholder={"Password"}
                                                type={passwordVisible}
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                }}
                                                status={password === "" ? "error" : ""}
                                                error = {password === "" ? "Password Cannot be empty" : "" }
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Input
                                                label={"Confirm Password"}
                                                className={"w-full"}
                                                placeholder={"Confirm Password"}
                                                type={passwordVisible}
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    setConfirmPasswordTouched(true);

                                                }}
                                                status={isInvalidConfirmPassword ? "error" : ""}
                                                error = {isInvalidConfirmPassword ? "Passwords do not match" : ""}
                                            />
                                            <Button className={"md:w-full mt-2"} onClick={() => setPasswordVisible((prevState) => prevState === 'password' ? 'text' : 'password')}>
                                                {passwordVisible === 'password' ? 'Show' : 'Hide'}
                                            </Button>

                                        </FormItem>

                                        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                                            <Button variant={"flat"} color={"primary"} onClick={() => setPage(2)}>
                                                Back
                                            </Button>
                                            <Button variant={"flat"} color={"primary"} onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                        </div>

                                    </>
                                ): null}
                            </Form>
                        </div>
                        <div className={"block md:hidden text-center"}>
                            <p style={{fontSize: "10px"}} className={"mb-2 mt-3 dark:text-darkSecondary"}>
                                © {new Date().getFullYear()} DPacks. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}