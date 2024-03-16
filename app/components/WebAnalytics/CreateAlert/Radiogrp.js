import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export default function AnalyticRadGrp() {
    return (
        <RadioGroup className="flex-jusify-around "
            label="Duration"
            orientation="horizontal"
        >
            <Radio className="colo" value="immediate" >Immediate</Radio>
            <Radio value="beforeReach">Before reach</Radio>
            <Radio value="both">Both</Radio>


        </RadioGroup>
    );
}
