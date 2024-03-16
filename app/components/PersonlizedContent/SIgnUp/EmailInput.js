import React from "react";
import {Input} from "@nextui-org/react";

export default function InputField(props) {;

  return (
    <Input type={props.type} variant="faded" label={props.label} placeholder={props.placeHolder} radius="full" className="w-80 m-2" />
    
  );
}
