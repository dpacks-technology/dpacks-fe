'use client';

import Table from "@/app/components/Table";
import React from "react";

export default function Webpages() {

    const columns = [
        {name: "TEXT", uid: "text", sortable: true, type: "text"},
        {name: "TWO TEXT", uid: "twoText", sortable: true, type: "twoText"},
        {name: "DATETIME", uid: "datetime", sortable: true, type: "datetime"},
        {name: "LABEL", uid: "label", sortable: true, type: "label"},
        {name: "STATUS", uid: "status", sortable: true, type: "status"},
        {name: "STATUS BUTTONS", uid: "statusButtons", sortable: true, type: "statusButtons"},
        {name: "BUTTONS", uid: "buttons", sortable: true, type: "buttons"},
        {name: "MENU", uid: "menu", sortable: true, type: "menu"},
        {name: "COPY", uid: "copy", sortable: true, type: "copy"},
        {name: "ICON", uid: "icon", sortable: true, type: "icon"},
        {name: "ICON TEXT", uid: "iconText", sortable: true, type: "iconText"},
        {name: "ICON TWO TEXT", uid: "iconTwoText", sortable: true, type: "iconText"},
    ];

    const init_cols = [
        "text",
        "twoText",
        "datetime",
        "label",
        "status",
        "statusButtons",
        "buttons",
        "menu",
        "copy",
        "icon",
        "iconText",
        "iconTwoText",
    ];

    const statusOptions = [
        {name: "Pending", uid: 0, type: "warning"},
        {name: "Completed", uid: 1, type: "success"},
        {name: "Error", uid: 2, type: "danger"}
    ];

    const data = [
        {
            id: 1,
            text: "text 1",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 1,
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=1",
            iconText: "https://i.pravatar.cc/150?img=1\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=1\nSample Text\nSecondary Text",
        },
        {
            id: 2,
            text: "text 2",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 0,
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=2",
            iconText: "https://i.pravatar.cc/150?img=2\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=2\nSample Text\nSecondary Text",
        },
        {
            id: 3,
            text: "text 3",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 2,
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=3",
            iconText: "https://i.pravatar.cc/150?img=3\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=3\nSample Text\nSecondary Text",
        },
        {
            id: 4,
            text: "text 4",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 3,
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=4",
            iconText: "https://i.pravatar.cc/150?img=4\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=4\nSample Text\nSecondary Text",
        },
        {
            id: 5,
            text: "text 5",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 0,
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=5",
            iconText: "https://i.pravatar.cc/150?img=5\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=5\nSample Text\nSecondary Text",
        },
        {
            id: 6,
            text: "text 6",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 0,
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=6",
            iconText: "https://i.pravatar.cc/150?img=6\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=6\nSample Text\nSecondary Text",
        },
        {
            id: 7,
            text: "text 6",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            status: 0,
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?img=7",
            iconText: "https://i.pravatar.cc/150?img=7\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?img=7\nSample Text\nSecondary Text",
        },
    ];

    const viewButton = (id) => {
        console.log("view: " + id);
    }

    const editButton = (id) => {
        console.log("edit: " + id);
    }

    const deleteButton = (id) => {
        console.log("delete: " + id);
    }

    const actionButtons = [
        {name: "View", text: "View", icon: "", type: "default", function: viewButton},
        {name: "Edit", text: "Edit", icon: "", type: "primary", function: editButton},
        {name: "Delete", text: "Delete", icon: "", type: "danger", function: deleteButton},
    ];

    const updateStatusButton = (id, status) => {
        console.log(id, statusOptions.find((item) => item.uid === status).name);
    }

    const statusButtons = [
        {
            currentStatus: [1, 2],
            name: "Pending",
            uid: 0,
            type: "warning",
            function: updateStatusButton,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
            </svg>

        },
        {
            currentStatus: [0, 2],
            name: "Completed",
            uid: 1,
            type: "success",
            function: updateStatusButton,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       strokeWidth={1.5}
                       stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        },
        {
            currentStatus: [0, 1],
            name: "Error",
            uid: 2,
            type: "danger",
            function: updateStatusButton,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       strokeWidth={1.5}
                       stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
            </svg>
        },
    ]

    const menuButtons = [
        {name: "View", text: "View", function: viewButton},
        {name: "Edit", text: "Edit", function: editButton},
        {name: "Delete", text: "Delete", function: deleteButton},
    ];

    const updateStatusBulk = (ids, status) => {
        console.log(ids, status);
    };

    const handleUpdateStatusBulk = (selectedKeys, status, currentItems) => {
        if (selectedKeys === 'all') {
            updateStatusBulk(currentItems, status);
        } else {
            updateStatusBulk(
                Array.from(selectedKeys).map((str) => parseInt(str, 10)),
                status
            );
        }
    };

    const deleteBulk = (ids) => {
        console.log(ids);
    }

    const handleDeleteBulk = (selectedKeys, currentItems) => {
        if (selectedKeys === 'all') {
            deleteBulk(currentItems);
        } else {
            deleteBulk(
                Array.from(selectedKeys).map((str) => parseInt(str, 10))
            );
        }
    }

    // Fetch table data
    const fetchTableData = () => {
        console.log('Fetching table data...');
    }

    return (
        <>
            <Table
                data={data}
                columns={columns}
                init_cols={init_cols}

                actionButtons={actionButtons}
                statusButtons={statusButtons}
                fetchTableData={fetchTableData}
                statusOptions={statusOptions}
                menuButtons={menuButtons}

                searchColumn={"text"}
                dateColumn={"datetime"}

                handleUpdateStatusBulk={handleUpdateStatusBulk}
                handleDeleteBulk={handleDeleteBulk}
            />
        </>
    )
}