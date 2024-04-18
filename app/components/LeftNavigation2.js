"use client";

// LeftNavigation2.js
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Button, useDisclosure} from "@nextui-org/react";
import {message} from "antd";
import Model from "@/app/components/Model";
import {usePathname} from "next/navigation";
import AddToBlockList from './forms/webpages/BlockList/AddToBlockList';
import AddRatelimitForm from "@/app/components/forms/endpoint/AddEndpointRatelimitForm";
import AddApiSubscriberForm from "@/app/components/forms/apisubscriber/AddApiSubscriberForm";
import AddTemplateForm from "@/app/components/forms/marketplace/AddTemplateForm";
import AddAutoRespondsForm from "@/app/components/forms/webchats/AddAutomatedMessageForm";
import AddWebpageForm from "@/app/components/forms/sites/AddSiteForm";
import {UserDashboardNavigation} from "@/app/data/UserDashboardNavigation";

const LeftNavigation2 = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [subNavigationItems, setSubNavigationItems] = useState([]); // sub navigation items

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

    let pathname, mainPath;

    if (fullPathname.split("/")[1] === "admin") {
        pathname = [fullPathname.split("/")[2], fullPathname.split("/")[3]].join("/")
        mainPath = fullPathname.split("/")[2]
    } else {
        pathname = [fullPathname.split("/")[3], fullPathname.split("/")[4]].join("/")
        mainPath = fullPathname.split("/")[3]
    }

    const handleAddButton = () => {
        onOpen();
    }

    // TODO: Add more components for add form
    const getComponentByPath = (pathname, notificationMessage) => {
        switch (pathname) {
            case "web/webpages":
                return <AddWebpageForm notificationMessage={notificationMessage}/>;
            case "api/endpoints":
                return <AddRatelimitForm notificationMessage={notificationMessage}/>;
            case "marketplace/template":
                return <AddTemplateForm notificationMessage={notificationMessage}/>;
            case "chat/automatedMessage":
                return <AddAutoRespondsForm notificationMessage={notificationMessage}/>;
            case "api/subscribers":
                return <AddApiSubscriberForm notificationMessage={notificationMessage}/>;
            default:
                return <AddToBlockList notificationMessage={notificationMessage}/>;
        }
    };

    useEffect(() => {
        console.log("mainPath: ", mainPath);
        const navigationItem = UserDashboardNavigation.find(item => item.url.split('/')[1] === mainPath);
        navigationItem.children && console.log("navigationItem: " + navigationItem.children);
        navigationItem.children && setSubNavigationItems(navigationItem.children);
    }, [mainPath]);

    return (
        <>
            {contextHolder}
            <Model modelForm={getComponentByPath(pathname, notificationMessage)} title={"Add webpage"} button={"Add"}
                   isOpen={isOpen} onOpenChange={onOpenChange}/>

            <nav className="w-48 h-full fixed top-0 left-16">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-transparent mt-24">
                    <ul className="space-y-2 font-medium">

                        {/* add button */}
                        <li className={"mb-8"}>
                            <div className={"inline-block ml-2"}>
                                <Button color="primary" className={"w-32 h-12"} variant={"flat"}
                                        onPress={handleAddButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                    Add
                                </Button>
                            </div>
                        </li>

                        {subNavigationItems.length > 0 && subNavigationItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.url ? item.url : "/u"}
                                   className="flex items-center p-2 ml-2 pl-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:rounded-3xl dark:hover:bg-gray-800 group">
                                    {item.icon && item.icon}
                                    <p className="ms-3 text-sm font-normal">{item.name && item.name}</p>
                                    {item.children && item.children.map((child, index) => (
                                        <Link key={index} href={child.url} className="block p-2 ml-2 pl-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:rounded-3xl dark:hover:bg-gray-800">
                                            {child.icon && child.icon}
                                            <p className="ms-3 text-sm font-normal">{child.name && child.name}</p>
                                        </Link>
                                    ))}
                                </Link>
                            </li>
                        ))}

                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*        className="flex items-center p-2 ml-2 pl-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:rounded-3xl dark:hover:bg-gray-800 group">*/}
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                        {/*            strokeWidth={1.1} stroke="currentColor" className="w-5 h-5">*/}
                        {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />*/}
                        {/*        </svg>*/}
                        {/*        <p className="ms-3 text-sm font-normal">AI Content</p>*/}
                        {/*    </a>*/}
                        {/*</li>*/}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default LeftNavigation2;