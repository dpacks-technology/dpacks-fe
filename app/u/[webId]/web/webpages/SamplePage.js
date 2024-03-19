// 'use client';
//
// import Table from "@/app/components/Table";
// import React, {useEffect} from "react";
// import {getWebPages} from "@/services/userService";
//
// export default function Webpages() {
//
//     // states
//     const [searchFieldValue, setSearchFieldValue] = React.useState("");
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
//     const [data, setData] = React.useState([]);
//
//     // default columns
//     const dateColumn = "datetime" // default date column
//     const sortColumn = {column: "id", direction: "ascending"} // default sort column
//     const [searchColumn, setSearchColumn] = React.useState(sortColumn.column); // default search column
//
//     // columns
//     const columns = [
//         {name: "ID", uid: "id", sortable: true, type: "text"},
//         {name: "TEXT", uid: "text1", sortable: true, type: "text"},
//         {name: "TWO TEXT", uid: "twoText", sortable: true, type: "twoText"},
//         {name: "DATETIME", uid: "datetime", sortable: true, type: "datetime"},
//         {name: "LABEL", uid: "label", sortable: false, type: "label"},
//         {name: "STATUS", uid: "status", sortable: true, type: "status"},
//         {name: "STATUS BUTTONS", uid: "statusButtons", sortable: false, type: "statusButtons"},
//         {name: "BUTTONS", uid: "buttons", sortable: false, type: "buttons"},
//         {name: "MENU", uid: "menu", sortable: false, type: "menu"},
//         {name: "COPY", uid: "copy", sortable: false, type: "copy"},
//         {name: "ICON", uid: "icon", sortable: false, type: "icon"},
//         {name: "ICON TEXT", uid: "iconText", sortable: true, type: "iconText"},
//         {name: "ICON TWO TEXT", uid: "iconTwoText", sortable: true, type: "iconText"},
//     ];
//
//     // initially visible columns
//     const init_cols = [
//         "text1",
//         "twoText",
//         "datetime",
//         "label",
//         "status",
//         "statusButtons",
//         "buttons",
//         "menu",
//         "copy",
//         "icon",
//         "iconText",
//         "iconTwoText",
//     ];
//
//     // data
//     /*const data = [
//         {
//             id: 1,
//             text1: "text 1",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 1,
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=1",
//             iconText: "https://i.pravatar.cc/150?img=1\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=1\nSample Text\nSecondary Text",
//         },
//         {
//             id: 2,
//             text1: "text 2",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 0,
//             buttons: "edit\ndelete",
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=2",
//             iconText: "https://i.pravatar.cc/150?img=2\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=2\nSample Text\nSecondary Text",
//         },
//         {
//             id: 3,
//             text1: "text 3",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 2,
//             buttons: "edit\ndelete",
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=3",
//             iconText: "https://i.pravatar.cc/150?img=3\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=3\nSample Text\nSecondary Text",
//         },
//         {
//             id: 4,
//             text1: "text 4",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 3,
//             buttons: "edit\ndelete",
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=4",
//             iconText: "https://i.pravatar.cc/150?img=4\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=4\nSample Text\nSecondary Text",
//         },
//         {
//             id: 5,
//             text1: "text 5",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 0,
//             buttons: "edit\ndelete",
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=5",
//             iconText: "https://i.pravatar.cc/150?img=5\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=5\nSample Text\nSecondary Text",
//         },
//         {
//             id: 6,
//             text1: "text 6",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 0,
//             buttons: "edit\ndelete",
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=6",
//             iconText: "https://i.pravatar.cc/150?img=6\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=6\nSample Text\nSecondary Text",
//         },
//         {
//             id: 7,
//             text1: "text 6",
//             twoText: "two\ntext",
//             datetime: "2024-03-06T12:45:30.000Z",
//             label: "label",
//             status: 0,
//             buttons: "edit\ndelete",
//             copy: "copy text",
//             icon: "https://i.pravatar.cc/150?img=7",
//             iconText: "https://i.pravatar.cc/150?img=7\nSample Text",
//             iconTwoText: "https://i.pravatar.cc/150?img=7\nSample Text\nSecondary Text",
//         },
//     ];*/
//
//     // action buttons
//     // action button functions
//     const viewButton = (id) => {
//         console.log("view: " + id);
//     }
//
//     const editButton = (id) => {
//         console.log("edit: " + id);
//     }
//
//     const deleteButton = (id) => {
//         console.log("delete: " + id);
//     }
//
//     // action buttons
//     const actionButtons = [
//         {name: "View", text: "View", icon: "", type: "default", function: viewButton},
//         {name: "Edit", text: "Edit", icon: "", type: "primary", function: editButton},
//         {name: "Delete", text: "Delete", icon: "", type: "danger", function: deleteButton},
//     ];
//
//     // menu buttons
//     // menu button functions
//     const viewMenuButton = (id) => {
//         console.log("view: " + id);
//     }
//
//     const editMenuButton = (id) => {
//         console.log("edit: " + id);
//     }
//
//     const deleteMenuButton = (id) => {
//         console.log("delete: " + id);
//     }
//
//     // menu buttons
//     const menuButtons = [
//         {name: "View", text: "View", function: viewMenuButton},
//         {name: "Edit", text: "Edit", function: editMenuButton},
//         {name: "Delete", text: "Delete", function: deleteMenuButton},
//     ];
//
//     // status options
//     const updateStatusButton = (id, status) => {
//         console.log(id, statusOptions.find((item) => item.uid === status).name);
//     }
//
//     const statusOptions = [
//         {
//             name: "Pending",
//             uid: 0,
//             type: "warning",
//             button: true,
//             currentStatus: [1, 2],
//             function: updateStatusButton,
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
//             </svg>
//
//         },
//         {
//             name: "Completed",
//             uid: 1,
//             type: "success",
//             button: true,
//             currentStatus: [0, 2],
//             function: updateStatusButton,
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                        strokeWidth={1.5}
//                        stroke="currentColor" className="w-5 h-5">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
//             </svg>
//         },
//         {
//             name: "Error",
//             uid: 2,
//             type: "danger",
//             button: true,
//             currentStatus: [0, 1],
//             function: updateStatusButton,
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                        strokeWidth={1.5}
//                        stroke="currentColor" className="w-5 h-5">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
//             </svg>
//         },
//     ]
//
//     // update status bulk
//     const updateStatusBulk = (ids, status) => {
//         console.log(ids, status);
//     };
//
//     const handleUpdateStatusBulk = (selectedKeys, status) => {
//         if (selectedKeys === 'all') {
//             updateStatusBulk(data.map(item => item.id), status);
//         } else {
//             updateStatusBulk(
//                 Array.from(selectedKeys).map((str) => parseInt(str, 10)),
//                 status
//             );
//         }
//     };
//
//     // delete bulk
//     const deleteBulk = (ids) => {
//         console.log(ids);
//     }
//
//     const handleDeleteBulk = (selectedKeys) => {
//         if (selectedKeys === 'all') {
//             deleteBulk(data.map(item => item.id));
//         } else {
//             deleteBulk(
//                 Array.from(selectedKeys).map((str) => parseInt(str, 10))
//             );
//         }
//     }
//
//     // Fetch table data
//     const fetchTableData = () => {
//
//         // fetch data from API
//         getWebPages().then((response) => {
//             console.log(response);
//             setData(response);
//         });
//
//     }
//
//     useEffect(() => {
//         fetchTableData();
//     }, []);
//
//     // ------------------------------------------------
//     // pagination
//     const setPage = (page) => {
//         console.log('Page: ' + page);
//     }
//
//     const onPreviousPage = (page) => {
//         console.log('Previous page: ' + page);
//     }
//
//     const onNextPage = (page) => {
//         console.log('Next page: ' + page);
//     }
//
//     // time range
//     const onTimeRangeChange = (start, end) => {
//         console.log(start, end);
//     }
//
//     // export
//     const exportData = () => {
//         console.log('Export');
//     }
//
//     // search
//     useEffect(() => {
//         search(searchColumn, searchFieldValue);
//     }, [searchColumn, searchFieldValue]);
//     const search = (searchColumn, text) => {
//         console.log('Column: ' + searchColumn + ', Text: ' + text);
//     }
//
//     // pages count
//     const pagesCount = () => {
//         return 7;
//     }
//
//     // rows per page
//     const changeRowsPerPage = (count) => {
//         setRowsPerPage(count);
//     }
//
//     // sort
//     const changeSorting = (sort) => {
//         setSearchColumn(sort.column);
//         console.log(sort);
//     }
//     // ------------------------------------------------
//
//     return (
//         <>
//             <Table
//                 data={data}
//                 columns={columns}
//                 init_cols={init_cols}
//
//                 actionButtons={actionButtons}
//                 fetchTableData={fetchTableData}
//                 statusOptions={statusOptions}
//                 menuButtons={menuButtons}
//
//                 searchColumn={searchColumn}
//                 dateColumn={dateColumn}
//                 sortColumn={sortColumn}
//
//                 handleUpdateStatusBulk={handleUpdateStatusBulk}
//                 handleDeleteBulk={handleDeleteBulk}
//
//                 setPage={setPage}
//                 onPreviousPage={onPreviousPage}
//                 onNextPage={onNextPage}
//
//                 onTimeRangeChange={onTimeRangeChange}
//
//                 exportData={exportData}
//
//                 search={search}
//                 searchFieldValue={[searchFieldValue, setSearchFieldValue]}
//
//                 pagesCount={pagesCount()}
//
//                 rowsPerPage={rowsPerPage}
//                 changeRowsPerPage={changeRowsPerPage}
//
//                 changeSorting={changeSorting}
//
//             />
//         </>
//     )
// }