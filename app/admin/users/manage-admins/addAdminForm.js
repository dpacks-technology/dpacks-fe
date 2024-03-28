"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";

export default function AddAdminForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Admin Added")
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <Input
                name="adminName"
                id="adminName"
                label="Name"
                margin="normal"
                className="rounded-lg"
                variant="outlined"
            />

            <Input
                type="email"
                name="adminEmail"
                id="adminEmail"
                label="Email"
                margin="normal"
                className="rounded-lg"
                variant="outlined"
            />

            <Input
                type="number"
                name="adminContactNumber"
                id="adminContactNumber"
                label="Contact Number"
                margin="normal"
                className="rounded-lg"
                variant="outlined"
            />

            <Input
                type="password"
                name="adminpwd"
                id="adminpwd"
                label="Password"
                margin="normal"
                className="rounded-lg"
                variant="outlined"
            />

            <Button
                variant="solid"//solid, faded, bordered, light, flat, ghost, shadow
                color="primary"//default, primary, secondary, success, warning, danger
                size="md"//sm, md, lg
                radius="md"
                className="m-5 h-10"
                type={"submit"}
            >
                Add Admin
            </Button>
        </form>

    );
}