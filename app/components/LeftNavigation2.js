// LeftNavigation2.js
import React from 'react';
import { Button, useDisclosure } from "@nextui-org/react";
import { message } from "antd";
import Model from "@/app/components/Model";

import { usePathname } from "next/navigation";
import AddRatelimitForm from "@/app/components/forms/endpoint/AddEndpointRatelimitForm";
import AddApiSubscriberForm from "@/app/components/forms/apisubscriber/AddApiSubscriberForm";

import AddAutoRespondsForm from "@/app/components/forms/webchats/AddAutomatedMessageForm";
import AddWebpageForm from "@/app/components/forms/sites/AddSiteForm";

const LeftNavigation2 = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const notificationMessage = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // get url pathname
    const fullPathname = usePathname();

    let pathname;

    if (fullPathname.split("/")[1] === "admin")
        pathname = [fullPathname.split("/")[2], fullPathname.split("/")[3]].join("/")
    else
        pathname = [fullPathname.split("/")[3], fullPathname.split("/")[4]].join("/")

    const handleAddButton = () => {
        onOpen();
    }

    // TODO: Add more components for add form
    const getComponentByPath = (pathname, notificationMessage) => {
        console.log(pathname)
        switch (pathname) {
            case "web/webpages":
                return <AddWebpageForm notificationMessage={notificationMessage} />;
            case "example1/example1":
                return <AddWebpageForm notificationMessage={notificationMessage} />;
            case "example2/example2":
                return <AddWebpageForm notificationMessage={notificationMessage} />;
            case "api/endpoints":
                return <AddRatelimitForm notificationMessage={notificationMessage} />;
            case "chat/automatedMessage":
                return <AddAutoRespondsForm notificationMessage={notificationMessage} />;
            case "Analytics/Alert":
                return <AddAutoRespondsForm notificationMessage={notificationMessage} />;
            default:
                return null;
        }
    };

    

    return (
        <>
            {contextHolder}
            <Model modelForm={
                getComponentByPath(pathname, notificationMessage)
            } title={"Add webpage"} button={"Add"} isOpen={isOpen} onOpenChange={onOpenChange} />
            <nav className="w-48 h-full fixed top-0 left-16">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-transparent mt-24">
                    <ul className="space-y-2 font-medium">
                        <li className={"mb-8"}>
                            <div className={"inline-block ml-2"}>
                                <Button color="primary" className={"w-32 h-12"} variant={"flat"}
                                    onPress={handleAddButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add
                                </Button>
                            </div>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                </svg>
                                <p className="ms-3 text-sm font-normal">Webpages</p>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                                <p className="ms-3 text-sm font-normal">AI Content</p>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                <p className="ms-3 text-sm font-normal">Team</p>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                                <p className="ms-3 text-sm font-normal">Storage</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default LeftNavigation2;