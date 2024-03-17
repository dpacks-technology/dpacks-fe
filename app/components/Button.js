"use client"
import React from "react";
import {Button} from "@nextui-org/react";

export default function ButtonComponent({...props}) {
    return (
        <Button
            {...props}
        >
            {props.children}
        </Button>
    );
}
