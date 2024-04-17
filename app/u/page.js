"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {DeleteSiteService, GetSitesService} from "@/services/SitesService";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import DashboardNav from "@/app/components/DashboardNav";

export default function Dashboard() {

    const [sites, setSites] = useState([]);
    const router = useRouter();

    const DeleteSite = (id) => {
        // delete site
        DeleteSiteService(id).then(async () => {
            // get sites from getSitesService
            await GetSitesService().then((response) => {
                setSites(response);
            });
        });
    }

    useEffect(() => {
        // get sites from getSitesService
        GetSitesService().then((response) => {
            setSites(response);
        });
    }, []);

    return (
        <>
            <DashboardNav/>
            <div className={"grid grid-cols-3 gap-4 p-48"}>

                <Link href={"/u/add"}>
                    <div className={"bg-secondaryDark p-4 rounded-lg grid justify-center"}>+ Add</div>
                </Link>

                {sites && sites.length > 0 && sites.map((site, index) => (
                    <div key={index} className={"bg-secondaryDark p-4 rounded-lg grid justify-center"}>
                        <Link href={`/u/${site.id}/web/webpages`}>
                            <div>
                                {site.name}
                            </div>
                        </Link>
                        <div className={"mt-3 grid grid-cols-2 gap-4"}>
                            <Button onClick={() => {
                                router.push(`/u/edit/${site.id}`)
                            }}>Edit</Button>
                            <Button onClick={() => {
                                DeleteSite(site.id)
                            }}>Delete</Button>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
}