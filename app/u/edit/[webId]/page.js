"use client"

import Link from "next/link";
import EditSiteForm from "@/app/components/forms/sites/EditSiteForm";

export default function EditSite({ params: { webId } }) {

    // get webId parameter

    return (
        <>
            <div className={"container"}>
                <Link href={"/u"}>Back</Link>
                <h1>Edit Site - {webId}</h1>
                <EditSiteForm webId={webId}/>
            </div>
        </>
    );
}