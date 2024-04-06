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
            <div className={"w-full con-mid"} style={{minHeight: "100vh"}}>
                <div className={"dark:bg-secondaryDark w-full lg:w-1/2 p-12 pb-6 rounded-2xl"}>
                    <div className={"grid grid-cols-3 gap-12"}>
                        <div className={"col-span-1"}>
                            <div className={"w-full text-left"}>
                                <div className={"grid grid-cols-1 h-full gap-32"}>
                                    <div className={""}>
                                        <img src={"/images/logos/dpacks-logo-white.png"}
                                             className={"w-4/5"} alt={"DPacks Logo"}/>
                                        <h1 className={"dark:text-dark mt-3"}>Sign in</h1>
                                    </div>
                                    <div className={""}>
                                        <p style={{fontSize: "10px"}} className={"mb-2"}>
                                            © {new Date().getFullYear()} DPacks. All rights reserved.
                                        </p>
                                        <p style={{fontSize: "9px"}} className={"dark:text-darkSecondary"}>
                                            Technology for static web data management and global distribution.
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
                                <FormItem>
                                    <Button variant={"flat"} color={"primary"} className={"w-full mt-2"}>Sign in</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}