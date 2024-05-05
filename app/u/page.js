"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";
import {DeleteSiteService, GetSitesService} from "@/services/SitesService";
import {Button, useDisclosure} from "@nextui-org/react";
import {message} from "antd";
import {useRouter} from "next/navigation";
import DashboardNav from "@/app/components/DashboardNav";
import DashboardFooter from "@/app/layouts/DashboardFooter";
import Model from "@/app/components/Model";
import AddWebProjectForm from "@/app/components/forms/project/AddWebProjectForm";
import EditWebProjectForm from "@/app/components/forms/project/EditWebProjectForm";
import Keys from "@/Keys";

export default function Dashboard() {

    const [sites, setSites] = useState([]);
    const [webId, setWebId] = useState("");
    const [open, setOpen] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter();

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleOpenAddProject = async () => {
        await setWebId("");
        await onOpen();
    }

    const handleOpenEditProject = async (id) => {
        await setWebId(id);
        await onOpen();
    }

    const DeleteSite = (id) => {
        // delete site
        DeleteSiteService(id).then(async () => {
            await Message("success", "Web project deleted");

            // get sites from getSitesService
            await GetSitesService().then((response) => {
                setSites(response);
            });
        }).catch((error) => {
            Message("error", "Error deleting web project");
        });
    }

    useEffect(() => {
        // get sites from getSitesService
        GetSitesService().then((response) => {
            setSites(response);
        });
    }, []);

    async function handleInstallationCopyScript(id) {
        await navigator.clipboard.writeText(`
            <!-- DPacks Header -->
            <script>const dpacks_key = "${id}";</script>
            <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js"></script>
            <script async id="dpacks_script" src="${Keys.CONNECTOR_URL}"></script>
            <!-- DPacks Header -->`);
    }

    return (
        <>
            {contextHolder}
            <DashboardNav/>

            <Model modelForm={
                webId === "" ?
                    <AddWebProjectForm/> : <EditWebProjectForm webId={webId}/>
            } title={webId === "" ? "Add Web Project" : "Edit Web Page"} isOpen={isOpen} onOpenChange={onOpenChange}/>

            <div className={"p-12 pt-24 pb-10 md:pr-48 md:pl-48 md:pt-36 md:pb-20"}>

                <h1 className={"text-2xl"}>
                    DPacks Platform
                </h1>
                <p className={"text-darkSecondary text-xs"}>
                    Web Enhancing and Static Data Management Technology
                </p>

                {/* product tabs */}
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl pt-12 pb-12"}>
                    <Link href={`/pros/dashbord`}>
                        <div className={"dashboard-tab-1 p-4 rounded-3xl grid justify-center h-24 con-mid"}>
                            <div className="grid grid-cols-2 w-full">
                                <div className={"con-mid w-1/2"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                    </svg>
                                </div>
                                <div className={"con-mid w-1/2"}>
                                    Web Visitor Personalization
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={`/u/api`}>
                        <div className={"dashboard-tab-2 p-4 rounded-3xl grid justify-center h-24 con-mid"}>
                            <div className="grid grid-cols-2 w-full">
                                <div className={"con-mid w-1/2"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"/>
                                    </svg>
                                </div>
                                <div className={"con-mid w-1/2"}>
                                    Web Data API
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={`/u`}>
                        <div className={"dashboard-tab-3 p-4 rounded-3xl grid justify-center h-24 con-mid"}>
                            <div className="grid grid-cols-2 w-full">
                                <div className={"con-mid w-1/2"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"/>
                                    </svg>
                                </div>
                                <div className={"con-mid w-1/2"}>
                                    Templates<br/>Library
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* web projects */}
                <div className={"mt-8 md:mt-12"}>
                    <h1 className={"mb-6"}>Web Projects</h1>
                    <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 pb-6"}>

                        {/*<Link href={"/u/add"}>*/}
                        <div
                            className={"h-32 add-project-tab p-4 rounded-3xl grid justify-center con-mid cursor-pointer"}
                            onClick={handleOpenAddProject}>
                            <div className="grid grid-cols-2 w-full">
                                <div className={"con-mid"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                </div>
                                <div className={"con-mid w-3/4"}>
                                    Add Project
                                </div>
                            </div>
                        </div>
                        {/*</Link>*/}

                        {/*<Link href={"/u/add"}>*/}
                        {/*    <div className={"bg-secondaryDark p-4 rounded-3xl con-mid h-36"}>*/}
                        {/*        <div>+ Add</div>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}

                        {sites && sites.length > 0 && sites.map((site, index) => (
                            <div key={index} className={"project-tab p-4 rounded-3xl w-full"}>
                                <Link href={`/u/${site.id}/web/packets`} className={"h-30"}>
                                    <div className={"pl-3 pt-2 pr-3"}>

                                        <h1 className={"text-md"}>{site.name}</h1>
                                        <p className={"text-xs text-gray-500"}>
                                            Domain: {site.domain}
                                        </p>

                                    </div>
                                </Link>
                                <div className={"con-mid pb-3"}>
                                    <div className={"mt-3 w-full h-6 flex justify-between items-start"}>
                                        <div>
                                            <Button
                                                className={"z-40"}
                                                size="sm"
                                                color="" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"/>
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    // copy script
                                                    handleInstallationCopyScript(site.id).then(() => {
                                                        Message("success", "Script copied, Paste inside `head` tags at your webpages");
                                                    });
                                                }}>
                                                Copy Script
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                isIconOnly
                                                className={"z-40"}
                                                size="sm"
                                                color="" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    let packet_url = `https://${site.domain}`;
                                                    window.open(packet_url, '_blank').focus();
                                                }}/>
                                            <Button
                                                isIconOnly
                                                className={"z-40"}
                                                size="sm"
                                                color="" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    // router.push(`/u/edit/${site.id}`)
                                                    handleOpenEditProject(site.id)
                                                }}/>
                                            <Button
                                                isIconOnly
                                                className={"z-40"}
                                                size="sm"
                                                color="danger" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    DeleteSite(site.id)
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* dashboard footer */}
            <DashboardFooter/>
        </>
    );
}