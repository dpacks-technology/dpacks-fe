'use client';

import Table from "@/app/components/Table";
import React, {useCallback, useEffect} from "react";
import {
    deletePage,
    deleteWebpagesBulk,
    getPagesByDatetime,
    getPagesByDatetimeCount,
    getPagesByStatus,
    getPagesByStatusCount,
    getWebPages,
    getWebPagesCount,
    updateWebpagesStatus,
    updateWebpagesStatusBulk
} from "@/services/userService";
import {useDisclosure} from "@nextui-org/react";
import EditWebpageForm from "@/app/components/forms/webpages/EditWebpageForm";
import {message} from "antd";

export default function Webpages() {

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const headerMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    // states
    const [searchFieldValue, setSearchFieldValue] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pagesCount, setPagesCount] = React.useState(0);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // default columns
    const dateColumn = "datetime" // default date column
    const sortColumn = {column: "id", direction: "ascending"} // default sort column
    const [searchColumn, setSearchColumn] = React.useState(sortColumn.column); // default search column


    // columns
    const columns = [
        {name: "ID", uid: "id", sortable: true, type: "text"},
        {name: "NAME", uid: "name", sortable: true, type: "text"},
        {name: "PATH", uid: "path", sortable: true, type: "text"},
        {name: "CREATED ON", uid: "date_created", sortable: false, type: "datetime"},
        {name: "STATUS", uid: "status", sortable: false, type: "status"},
        {name: "CHANGE STATUS", uid: "statusButtons", sortable: false, type: "statusButtons"},
        {name: "ACTIONS", uid: "menu", sortable: false, type: "menu"},
    ];

    // initially visible columns
    const init_cols = [
        "name",
        "path",
        "date_created",
        "status",
        "statusButtons",
        "menu"
    ];

    // action buttons
    // action button functions
    const viewButton = (id) => {
        console.log("view: " + id);
    }

    const editButton = (id) => {
        console.log("edit: " + id);
    }

    const deleteButton = (id) => {
        deletePage(id).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    }

    // action buttons
    const actionButtons = [
        {name: "View", text: "View", icon: "", type: "default", function: viewButton},
        {name: "Edit", text: "Edit", icon: "", type: "primary", function: editButton},
        {name: "Delete", text: "Delete", icon: "", type: "danger", function: deleteButton},
    ];

    // menu buttons
    // menu button functions
    const viewMenuButton = (id) => {
        console.log("view: " + id);
    }

    const editMenuButton = (id) => {
        console.log("edit: " + id);
    }

    const deleteMenuButton = (id) => {
        deletePage(id).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    }

    // menu buttons
    const menuButtons = [
        {name: "View", text: "View", function: viewMenuButton},
        {name: "Edit", text: "Edit", function: onOpen},
        {name: "Delete", text: "Delete", function: deleteMenuButton},
    ];

    // status options
    const updateStatusButton = (id, status) => {
        updateWebpagesStatus(id, status).then(() => {
            refreshData("success", "Updated");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    }

    const statusOptions = [
        {
            name: "Offline",
            uid: 0,
            type: "danger",
            button: true,
            currentStatus: [1, 2],
            function: updateStatusButton,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        },
        {
            name: "Active",
            uid: 1,
            type: "success",
            button: true,
            currentStatus: [0, 2],
            function: updateStatusButton,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        }
    ]

    // update status bulk
    const updateStatusBulk = (ids, status) => {
        updateWebpagesStatusBulk(ids, status).then(() => {
            refreshData("success", "Updated");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    };

    const handleUpdateStatusBulk = (selectedKeys, status) => {
        if (selectedKeys === 'all') {
            updateStatusBulk(data.map(item => item.id), status);
        } else {
            updateStatusBulk(
                Array.from(selectedKeys).map((str) => parseInt(str, 10)),
                status
            );
        }
    };

    // delete bulk
    const deleteBulk = (ids) => {
        deleteWebpagesBulk(ids).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    }

    const handleDeleteBulk = (selectedKeys) => {
        if (selectedKeys === 'all') {
            deleteBulk(data.map(item => item.id));
        } else {
            deleteBulk(
                Array.from(selectedKeys).map((str) => parseInt(str, 10))
            );
        }
    }

    const refreshData = (type, message) => {

        console.log(type, message);

        // success message
        if (type === "success")
            headerMessage(type, message);

        // fetch data from API
        getWebPagesCount(searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        getWebPages(rowsPerPage, currentPage, searchColumn, searchFieldValue)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));
    }

    // Fetch table data
    const fetchTableData = (useCallback((page, key, val) => {

        // fetch data from API
        getWebPagesCount(key, val).then((response) => setPagesCount(response));

        getWebPages(rowsPerPage, page, key, val)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }, [rowsPerPage]));

    useEffect(() => {
        fetchTableData(currentPage, searchColumn, searchFieldValue);
    }, [currentPage, fetchTableData, rowsPerPage]);

    // ------------------------------------------------
    // pagination
    const setPage = (page) => {
        setCurrentPage(page);
    }

    const onPreviousPage = (page) => {
        console.log('Previous page: ' + page);
    }

    const onNextPage = (page) => {
        console.log('Next page: ' + page);
    }

    // time range
    const onTimeRangeChange = (start, end) => {

        if (start === null || end === null) {
            fetchTableData(currentPage, searchColumn, searchFieldValue);
        } else {
            getPagesByDatetimeCount(start, end, searchColumn, searchFieldValue).then((response) => setPagesCount(response));
            getPagesByDatetime(rowsPerPage, currentPage, start, end, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
        }
    }

    // status change
    const statusChange = (statusArray) => {
        getPagesByStatusCount(statusArray, searchColumn, searchFieldValue).then((response) => setPagesCount(response));
        getPagesByStatus(rowsPerPage, currentPage, statusArray, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
    }

    // rows per page
    const changeRowsPerPage = (count) => {

        // get current top item
        let currentTopItem = rowsPerPage * (currentPage - 1) + 1;

        // set current page
        if (currentTopItem > count) {
            setCurrentPage(Math.ceil(currentTopItem / count));
        }

        // set rows per page
        setRowsPerPage(count);
    }

    // sort
    const changeSorting = (sort) => {
        setSearchColumn(sort.column);
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFieldValue]);

    // ------------------------------------------------

    return (
        <>
            {contextHolder}
            <Table
                data={data}
                columns={columns}
                init_cols={init_cols}

                actionButtons={actionButtons}
                fetchTableData={fetchTableData}
                statusOptions={statusOptions}
                menuButtons={menuButtons}

                searchColumn={searchColumn}
                dateColumn={dateColumn}
                sortColumn={sortColumn}

                handleUpdateStatusBulk={handleUpdateStatusBulk}
                handleDeleteBulk={handleDeleteBulk}

                setPage={setPage}
                onPreviousPage={onPreviousPage}
                onNextPage={onNextPage}

                statusChange={statusChange}


                currentPage={currentPage}

                editMenuButton={editMenuButton}

                editItemIsOpen={isOpen}
                editItemOnOpenChange={onOpenChange}

                editForm={<EditWebpageForm refreshData={refreshData}/>}

                onTimeRangeChange={onTimeRangeChange}

                searchFieldValue={[searchFieldValue, setSearchFieldValue]}

                dataCount={pagesCount}

                rowsPerPage={rowsPerPage}
                changeRowsPerPage={changeRowsPerPage}

                changeSorting={changeSorting}

            />
        </>
    )
}