import Input from "@/app/components/Input";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import AddSiteForm from "@/app/components/forms/sites/AddSiteForm";

export default function AddSite() {
    return (
        <>
            <div className={"container"}>
                <Link href={"/u"}>Back</Link>
                <h1>Add Site</h1>
                <AddSiteForm/>
            </div>
        </>
    );
}