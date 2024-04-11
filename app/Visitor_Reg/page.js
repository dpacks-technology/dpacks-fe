"use client"

import { Form, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import Input from "@/app/components/Input";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { users } from "../components/PersonlizedContent/SIgnUp/data";
import {form2,form1,form3} from "@/app/validaitions/VisitorRegValidations";

export default function GetNamePage() {
  const [page, setPage] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInvalidConfirmPassword, setIsInvalidConfirmPassword] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [IsPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [error, setError] = React.useState({});

  


  useEffect(() => {
    if (password !== confirmPassword && confirmPasswordTouched) {
      setIsInvalidConfirmPassword(true);
    } else {
      setIsInvalidConfirmPassword(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password === "") {
      setIsPasswordEmpty(true);
    } else {
      setIsPasswordEmpty(false);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      date_of_birth: dateOfBirth,
      gender: gender,
      password: password,
    };

    console.log(data);

    //send data to backend using
    try {
      const response = await axios.post(`http://34.47.130.27:4010`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <div className={"flex items-center justify-center min-h-screen p-6"} style={{ minHeight: "100vh" }}>
        <div className={"dark:bg-secondaryDark w-full sm:w-3/4 lg:w-1/2 p-6 lg:p-12 rounded-2xl"}>
          <div className={"md:grid md:grid-cols-3 md:gap-12"}>
            <div className={"col-span-1 p-2"}>
              <div className={"w-full text-left"}>
                <div className={"md:grid grid-cols-1 md:gap-24"}>
                  <div>
                    <img src={"/images/logos/dpacks-logo-white.png"}
                      className={"w-1/2 sm:w-1/2 md:w-3/4 lg:w-full xl:w-4/5"} alt={"DPacks Logo"} />
                    <h1 className={"dark:text-dark mt-3 text-md sm:text-lg mb-3 sm:mb-0"}>Sign in</h1>
                  </div>
                  <div className={"hidden md:block"}>
                    <p style={{ fontSize: "10px" }} className={"mb-2"}>
                      ©️ {new Date().getFullYear()} DPacks. All rights reserved.
                    </p>
                    <p style={{ fontSize: "9px" }} className={"dark:text-darkSecondary"}>
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
                        type="text"
                        variant="faded"
                        label="First Name"
                        placeholder="Enter Your First Name"
                        size="sm"
                        className="w-80 text-black m-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        status={error.firstName ? "error" : ""}
                        error={error.firstName}
                      />
                    </FormItem>
                    <FormItem>
                      <Input
                        type="text"
                        variant="faded"
                        label="Last Name"
                        placeholder="Enter Your Last Name"
                        size="sm"
                        className="w-80 text-black m-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        status={error.lastName ? "error" : ""}
                        error={error.lastName}
                      />
                    </FormItem>
                    <FormItem>
                      <div className="flex flex-row justify-end">
                        <Button variant={"flat"} color={"primary"} className={"md:w-2/6 w-full"} onClick={async () => {
                          try {
                            // data // TODO: add/change fields
                            const data = { firstName,lastName };

                            console.log(data)
                            // validate
                            await form1.validate(data, { abortEarly: false });
                            setPage(1);
                            //clear error massage
                            setError({});
                          }
                          catch (validationError) {
                            console.log(validationError.errors)
                            // set error
                            let errorsObject = {}
                            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
                            setError(errorsObject);
                          }
                        }}>
                          Next
                        </Button>
                      </div>


                    </FormItem>
                  </>
                ) : page === 1 ? (
                  <>
                    <FormItem className="md:mt-2">
                      <Input
                        type="email"
                        variant="faded"
                        label="Email"
                        placeholder="Enter Email"
                        size="sm"
                        className="w-80 text-black m-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        status={error.email ? "error" : ""}
                        error={error.email}
                      />
                    </FormItem>
                    <FormItem>
                      <Input
                        type="phone"
                        variant="faded"
                        label="Phone"
                        placeholder="Enter Phone Number"
                        size="sm"
                        className="w-80 text-black m-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        status={error.phone ? "error" : ""}
                        error={error.phone}
                      />
                    </FormItem>
                    <FormItem >
                      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                        <Button variant={"flat"} color={"primary"} onClick={() => setPage(0)}>
                          Back
                        </Button>
                        <Button variant={"flat"} color={"primary"} className={"md:w-2/6 w-full"} onClick={async () => {
                          try {
                            // data // TODO: add/change fields
                            const data = { email,phone };

                            console.log(data)
                            // validate
                            await form2.validate(data, { abortEarly: false });
                            setPage(2);
                            //clear error massage
                            setError({});
                          }
                          catch (validationError) {
                            console.log(validationError.errors)
                            // set error
                            let errorsObject = {}
                            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
                            setError(errorsObject);
                          }
                        }}>
                          Next
                        </Button>
                      </div>
                    </FormItem>
                  </>
                ) : page === 2 ? (
                  <>
                    <FormItem className="md:mt-2">
                      <Input
                        label={"Date of Birth"}
                        className={"w-full"}
                        placeholder={"Date of Birth"}
                        type={"date"}
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        status={error.dateOfBirth ? "error" : ""}
                        error={error.dateOfBirth}
                      />
                      <Select
                        value={gender}
                        onChange={(value) => setGender(value)}
                        status={error.gender ? "error" : ""}
                        error={error.gender}
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
                        <Button variant={"flat"} color={"primary"} className={"md:w-2/6 w-full"} onClick={async () => {
                          try {
                            // data // TODO: add/change fields
                            const data = { dateOfBirth,gender };

                            console.log(data)
                            // validate
                            await form3.validate(data, { abortEarly: false });
                            setPage(3);
                            //clear error massage
                            setError({});
                          }
                          catch (validationError) {
                            console.log(validationError.errors)
                            // set error
                            let errorsObject = {}
                            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
                            setError(errorsObject);
                          }
                        }}>
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
                        type={"password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                        status={password === "" ? "error" : ""}
                        error={password === "" ? "Password Cannot be empty" : ""}
                      />
                    </FormItem>
                    <FormItem>
                      <Input
                        label={"Confirm Password"}
                        className={"w-full"}
                        placeholder={"Confirm Password"}
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setConfirmPasswordTouched(true);

                        }}
                        status={isInvalidConfirmPassword ? "error" : ""}
                        error={isInvalidConfirmPassword ? "Passwords do not match" : ""}
                      />

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
                ) : null}
              </Form>
            </div>
            <div className={"block md:hidden text-center"}>
              <p style={{ fontSize: "10px" }} className={"mb-2 mt-3 dark:text-darkSecondary"}>
                ©️ {new Date().getFullYear()} DPacks. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}