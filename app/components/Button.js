"use client"
import React from "react";
import {Button} from "@nextui-org/react";

export default function ButtonComponent(props){
    const {name,variant, color, size, isDisabled, onClick} = props;

    return (
        <Button
            variant={variant}//solid, faded, bordered, light, flat, ghost, shadow
            color={color}//default, primary, secondary, success, warning, danger
            size={size}//sm, md, lg
            isDisabled={isDisabled === true}//if isDisabled prop is passed then only the button will be disabled
            onClick={onClick}//pass the function to be executed on click
        >
            {name}
        </Button>


        //how to use: pass the props to the component
        // <ButtonComponent
        //     name="Click me"
        //     variant="solid"
        //     color="success"
        //     size="lg"
        //     isDisabled  //if u pass this prop then the button will be disabled
        // />
    );
}
