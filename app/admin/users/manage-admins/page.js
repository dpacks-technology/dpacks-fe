"use client"

import React, {useState} from "react";
import AddAdminForm from "@/app/admin/users/manage-admins/addAdminForm";
import {Modal} from 'antd';
import {Button} from "@nextui-org/react";



export default function manageAdmins() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="p-10 w-full h-full flex flex-col">
            <Button
                variant="solid"//solid, faded, bordered, light, flat, ghost, shadow
                color="primary"//default, primary, secondary, success, warning, danger
                size="md"//sm, md, lg
                radius="md"
                className="mb-5 h-10 w-36"
                onClick={showModal}>
                Add Admin
            </Button>

            <Modal title="Add New Admin"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   style={{ top: 20 }}
                   footer={null}
            >
                <AddAdminForm/>
            </Modal>
            Table goes here

        </div>
    );
}