import Input from "@/app/components/Input";
import AnalyticInput from "@/app/components/WebAnalytics/CreateAlert/Input";

import AnalyticRadGrp from "@/app/components/WebAnalytics/CreateAlert/Radiogrp";


export default function Create(){
    return (
        <div>
            <h1 className="text-center text-3xl font-bold m-10">Create Alert</h1>
            <form className="p-7 ">

                <div className="flex justify-around">
                    <AnalyticInput type={"text"} label={"Name" }/>
                    <AnalyticInput type={"text"} label={"Trigger Count"}/>

                </div>

                <div className="flex justify-around m-10 mr-28" >
                <AnalyticRadGrp />
                </div>

            </form>


        </div>
    )
}