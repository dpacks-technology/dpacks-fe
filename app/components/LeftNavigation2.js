"use client";

// LeftNavigation2.js
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button, useDisclosure } from "@nextui-org/react";
import { message } from "antd";
import Model from "@/app/components/Model";
import { usePathname } from "next/navigation";
import AddRatelimitForm from "@/app/components/forms/endpoint/AddEndpointRatelimitForm";
import AddApiSubscriberForm from "@/app/components/forms/apisubscriber/AddApiSubscriberForm";
import AddTemplateForm from "@/app/components/forms/marketplace/AddTemplateForm";
import AddAutoRespondsForm from "@/app/components/forms/webchats/AddAutomatedMessageForm";
import CreateAlertForm from './forms/webpages/CreateAlertForm';
import { UserDashboardNavigation } from "@/app/data/UserDashboardNavigation";
import AddAdminForm from "@/app/components/forms/admins/AddAdminForm";
import AddWebpageForm from "@/app/components/forms/webpages/AddWebpageForm";
import { PContentNavigation } from '../data/PContentNavigation';
import { AdminDashboardNavigation } from '../data/AdminDashboardNavigation';
import AddToBlockList from './forms/Visitor/BlockList/AddToBlockList';

const LeftNavigation2 = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

    } 
    else if (fullPathname.split("/")[1] === "pros"){
        pathname = [fullPathname.split("/")[2], fullPathname.split("/")[3]].join("/")
        mainPath = fullPathname.split("/")[2]
    }
    else {
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
                return <AddWebpageForm notificationMessage={notificationMessage} />;
            case "analytics/alert":
                return <CreateAlertForm notificationMessage={notificationMessage} />;
            case "api/endpoints":
                return <AddRatelimitForm notificationMessage={notificationMessage} />;
            case "marketplace/template":
                return <AddTemplateForm notificationMessage={notificationMessage} />;
            case "chat/automatedMessage":
                return <AddAutoRespondsForm notificationMessage={notificationMessage} />;
            case "users/manage-admins":
                return <AddAdminForm notificationMessage={notificationMessage} />;
            case "api/subscribers":
                return <AddApiSubscriberForm notificationMessage={notificationMessage} />;
            case "dashbord/BlockList":
                return <AddToBlockList notificationMessage={notificationMessage} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (fullPathname.split("/")[1] == "u") {
            const navigationItem = UserDashboardNavigation.find(item => item.url.split('/')[1] === mainPath);
            navigationItem.children && setSubNavigationItems(navigationItem.children);
        }
        else if (fullPathname.split("/")[1] == "pros") {
            const navigationItem = PContentNavigation.find(item => item.url.split('/')[1] === fullPathname.split("/")[1]);
            navigationItem.children && setSubNavigationItems(navigationItem.children);
        }
        else if(fullPathname.split("/")[1] == "admin") {
            const navigationItem = AdminDashboardNavigation.find(item => item.url.split('/')[1] === fullPathname.split("/")[1]);
            navigationItem.children && setSubNavigationItems(navigationItem.children);
        }
    }, [mainPath]);


    return (
        <>
            {contextHolder}
            <Model modelForm={getComponentByPath(pathname, notificationMessage)} title={"Add webpage"} button={"Add"}
                isOpen={isOpen} onOpenChange={onOpenChange} />

            <nav className="w-48 h-full fixed top-0 left-16">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-transparent mt-24">
                    <ul className="space-y-2 font-medium">

                        {/* add button */}
                        {getComponentByPath(pathname, notificationMessage) && (
                            <li className={"mb-8"}>
                                <div className={"inline-block ml-2"}>
                                    <Button color="primary" className={"w-32 h-12"} variant={"flat"}
                                        onPress={handleAddButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add
                                    </Button>
                                </div>
                            </li>
                        )}

                        {subNavigationItems.length > 0 && subNavigationItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.url ? item.url : "/u"}
                                    className={`flex items-center p-2 ml-2 pl-4 text-gray-900 dark:text-white 
                                      dark:hover:bg-gray-700 group hover:bg-gray-100 rounded-3xl
                                      ${[item.url.split('/')[1], item.url.split('/')[2]].join('/') === pathname && " bg-gray-800"}
                                      `}>
                                    {item.icon && item.icon}
                                    <p className="ms-3 text-sm font-normal">{item.name && item.name}</p>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default LeftNavigation2;