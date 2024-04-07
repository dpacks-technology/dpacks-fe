import Input from "@/app/components/Input";
import {Form} from "antd";
import FormItem from "antd/es/form/FormItem";
import {Button} from "@nextui-org/react";

export default function LoginPage() {

    const Login = () => {
        // e.preventDefault();
        console.log("Login");
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
                                <FormItem>
                                    <Input
                                        label={"Email"}
                                        className={"w-full"}
                                        placeholder={"Email"}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Input
                                        label={"Password"}
                                        className={"w-full"}
                                        placeholder={"Password"}
                                        type={"password"}
                                    />
                                </FormItem>
                                <Button variant={"flat"} color={"primary"} className={"w-full mt-2"}>Sign in</Button>
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