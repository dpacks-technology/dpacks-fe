'use client';

import DataTable from "@/app/components/DataTable";

export default function Webpages() {

    // text
    // two-text
    // datetime
    // label
    // buttons
    // menu
    // copy
    // icon
    // icon-text

    const columns = [
        {name: "TEXT", uid: "text", sortable: true, type: "text"},
        {name: "TWO TEXT", uid: "twoText", sortable: true, type: "twoText"},
        {name: "DATETIME", uid: "datetime", sortable: true, type: "datetime"},
        {name: "LABEL", uid: "label", sortable: true, type: "label"},
        {name: "BUTTONS", uid: "buttons", sortable: true, type: "buttons"},
        {name: "MENU", uid: "menu", sortable: true, type: "menu"},
        {name: "COPY", uid: "copy", sortable: true, type: "copy"},
        {name: "ICON", uid: "icon", sortable: true, type: "icon"},
        {name: "ICON TEXT", uid: "iconText", sortable: true, type: "iconText"},
        {name: "ICON TWO TEXT", uid: "iconTwoText", sortable: true, type: "iconTwoText"},
    ];

    const init_cols = [
        "text",
        "twoText",
        "datetime",
        "label",
        "buttons",
        "menu",
        "copy",
        "icon",
        "iconText",
        "iconTwoText",
    ];

    const statusOptions = [
        {name: "Completed", uid: "1"},
        {name: "Error", uid: "2"},
        {name: "Pending", uid: "0"},
    ];

    const data = [
        {
            id: 1,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
        {
            id: 2,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
        {
            id: 3,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
        {
            id: 4,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
        {
            id: 5,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
        {
            id: 6,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
        {
            id: 7,
            text: "text",
            twoText: "two\ntext",
            datetime: "2024-03-06T12:45:30.000Z",
            label: "label",
            buttons: "edit\ndelete",
            menu: "menu 1\nmenu 1\nmenu 3",
            copy: "copy text",
            icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            iconText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text",
            iconTwoText: "https://i.pravatar.cc/150?u=a04258114e29026702d\nSample Text\nSecondary Text",
        },
    ];

    // Update status
    const updateStatus = (id, status) => {
        console.log(id, status);
    }

    // Update status bulk
    const handleUpdateStatusBulk = (status) => {
        console.log(status);
    }

    // Fetch table data
    const fetchTableData = () => {
        console.log('Fetching table data...');
    }

    // Update scams
    const handleUpdateScams = (id, status) => {
        console.log(id, status);
    }

    return (
        <>
            <DataTable data={data} statusOptions={statusOptions} columns={columns} init_cols={init_cols}
                       updateStatus={updateStatus}
                       handleUpdateStatusBulk={handleUpdateStatusBulk}
                       fetchTableData={fetchTableData}
                       handleUpdateScams={handleUpdateScams}
            />
        </>
    )
}