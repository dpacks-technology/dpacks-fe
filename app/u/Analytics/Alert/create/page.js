
import AnalyticInput from "@/app/components/WebAnalytics/CreateAlert/Input";
import AnalyticRadioGrp from "@/app/components/WebAnalytics/CreateAlert/Radiogrp";
import DropDown from "@/app/components/DropDown";
import ButtonComponent from "@/app/components/Button";
import {Button} from "@nextui-org/react";



export default function Create(){

    const data = [
        {key: "text", label: "Text", description: "Text"},
        {key: "number", label: "Number", description: "Number"},
        {key: "date", label: "Date", description: "Date"}];


    return (
        <div>
            <h1 className="text-center text-3xl font-bold m-10">Create Alert</h1>
            <form className="p-7 ">

                <div className="flex justify-around">
                    <AnalyticInput type={"text"} label={"Name"}/>
                    <AnalyticInput type={"text"} label={"Trigger Count"}/>
                </div>


                <div className="flex justify-around align-middle mt-10">
                    <div className="flex justify-center align-middle mt-2 pt-4">
                        <DropDown dropdownItems={data}/>
                    </div>
                    <div className="mb-8 ps-7">
                        <AnalyticRadioGrp/>
                    </div>
                </div>
                <div className="flex justify-center mt-1 ">
                    <Button className="ms-2.5 bg-amber-600 ">Done</Button>
                </div>

            </form>


        </div>
    )
}