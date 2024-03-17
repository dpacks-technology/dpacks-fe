import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export default function AnalyticRadioGrp() {
    return (
        <RadioGroup className="ps-12"
            label="Duration"
            orientation="horizontal">
            <Radio className=""   value="immediate" >Immediate</Radio>
            <Radio className="" value="beforeReach">Before reach</Radio>
            <Radio  className="" value="both">Both</Radio>
        </RadioGroup>
    );
}
