import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export default function AnalyticRadioGroup() {
    return (
        <RadioGroup
            label="Duration"
            orientation="horizontal"
        >
            <Radio value="buenos-aires">Immediate</Radio>
            <Radio value="sydney">Before Reach</Radio>
            <Radio value="san-francisco">Both</Radio>

        </RadioGroup>
    );
}
