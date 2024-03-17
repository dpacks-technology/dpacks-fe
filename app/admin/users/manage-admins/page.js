"use client"

import ButtonComponent from "@/app/components/Button";
import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";

export default function manageAdmins() {
    
    return (
        <div className="p-10 w-full h-full">
            <div className="flex flex-col w-[420px] p-10 bg-white" >
                <Input
                    name="adminName"
                    id="adminName"
                    label="Name"
                    className="mb-5 rounded-lg"
                    variant="outlined"
                />

                <Input
                    type="email"
                    name="adminEmail"
                    id="adminEmail"
                    label="Email"
                    className="mb-5 rounded-lg"
                    variant="outlined"
                />

                <Input
                    type="number"
                    name="adminContactNumber"
                    id="adminContactNumber"
                    label="Contact Number"
                    className="mb-5 rounded-lg"
                    variant="outlined"
                />

                <Input
                    type="password"
                    name="adminpwd"
                    id="adminpwd"
                    label="Password"
                    className="mb-5 rounded-lg"
                    variant="outlined"
                />

                <Button
                    variant="solid"//solid, faded, bordered, light, flat, ghost, shadow
                    color="primary"//default, primary, secondary, success, warning, danger
                    size="md"//sm, md, lg
                    radius="md"
                    className="mb-5 h-10"
                >
                    Add Admin
                </Button>
            </div>
        </div>
    );
}