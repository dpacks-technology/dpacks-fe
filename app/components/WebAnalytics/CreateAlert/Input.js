import React from "react";
import {Input} from "@nextui-org/react";

export default function AnalyticInput(props) {


    return (
                    <Input className="w-80" size="md" type={props.type} label={props.label}  />
    );
}
