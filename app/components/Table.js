'use client';

import React, {useEffect} from "react";
import {
    Avatar,
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table as NextUITable,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import {message, DatePicker} from 'antd';
const {RangePicker} = DatePicker;

// import * as XLSX from 'xlsx';
import {SearchIcon} from "./icons/SearchIcon";
import {ChevronDownIcon} from "./icons/ChevronDownIcon";
import {capitalize} from "./utils/Capitalize";
import {VerticalDotsIcon} from "@/app/components/icons/VerticalDotsIcon";

export default function Table({
                                  data,
                                  columns,
                                  init_cols,
                                  ...props
                              }) {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(init_cols));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currentItems, setCurrentItems] = React.useState([]);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });
    const [viewDate, setViewDate] = React.useState({
        startDate: Date,
        endDate: Date
    });
    const [monthSelect, setMonthSelect] = React.useState("");
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        if (monthSelect.size > 0)
            handleSetViewDate("month");
        else
            handleSetViewDate("all");
    }, [monthSelect]);


    const hasSearchFilter = Boolean(filterValue);

    function redirectToImage(image) {
        window.open(`./image/deposit/${image}`, "_blank");
    }

    // export data ---------------------------
    // const exportData = () => {
    //     console.log("Exporting data...");
    //     const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //     //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    //     XLSX.writeFile(workbook, "itrustld_deposit_export.xlsx");
    // }
    // export data ---------------------------

    // month list ---------------------------
    const [monthList, setMonthList] = React.useState([]);

    const convertToMonth = (month) => {
        switch (month) {
            case 1:
                return "January";
            case 2:
                return "Febuary";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "Octomber";
            case 11:
                return "November";
            case 12:
                return "December";
        }
    }

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();
        let tempMonthList = [];

        // Loop from 1 year ago to the current month
        for (let i = 12; i > 0; i--) {
            const newDate = new Date(currentDate);

            // Subtract i months from the current date
            newDate.setMonth(currentDate.getMonth() - i + 1);

            // Format the date to "YYYY-MM" string
            const formattedDate = {
                name: `${newDate.getFullYear()} - ${convertToMonth(newDate.getMonth() + 1)}`,
                uid: `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`
            };

            // Push the formatted date to the monthList array
            tempMonthList.push(formattedDate);
        }
        const reversedMonthList = tempMonthList.slice().reverse();
        setMonthList(reversedMonthList);
    }, []);

    // month list ---------------------------
    function isDefaultDate(date) {
        const defaultDate = new Date('Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)');
        return date.toDateString() === defaultDate.toDateString();
    }

    const handleValueChange = (newValue) => {
        console.log(isDefaultDate(new Date(newValue.startDate)));
        if (!isDefaultDate(new Date(newValue.startDate))) {
            setViewDate({
                startDate: new Date(newValue.startDate),
                endDate: new Date(newValue.endDate),
            });
        } else {
            setViewDate({
                startDate: Date,
                endDate: Date,
            });
        }
    }
    // datepicker

    // view date select ---------------------------
    const handleSetViewDate = (option) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Set time to 00:00:00 for the start date
        const setStartTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

        // Set time to 23:59:59.999 for the end date
        const setEndTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

        switch (option) {
            case "all":
                setViewDate({
                    startDate: Date,
                    endDate: Date
                });
                break;
            case "today":
                setViewDate({
                    startDate: setStartTime(today),
                    endDate: setEndTime(today)
                });
                break;
            case "yesterday":
                setViewDate({
                    startDate: setStartTime(yesterday),
                    endDate: setEndTime(yesterday)
                });
                break;
            case "month":
                const selectedMonth = Array.from(monthSelect).join(", ").toString();
                const month = selectedMonth.split('-')[1];
                const year = selectedMonth.split('-')[0];
                const firstDay = new Date(year, month - 1, 1);
                const lastDay = new Date(year, month, 0);
                setViewDate({
                    startDate: setStartTime(firstDay),
                    endDate: setEndTime(lastDay)
                });
                break;
        }
    };

    // view date select ---------------------------

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredData = [...data];
        if (hasSearchFilter) {
            filteredData = filteredData.filter((data) =>

                // search by the column mentioned in props.searchColumn
                data[props.searchColumn].toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (props.statusOptions && (statusFilter !== "all" && Array.from(statusFilter).length !== props.statusOptions.length)) {
            filteredData = filteredData.filter((data) =>
                Array.from(statusFilter).includes(data.status.toString()),
            );
        }

        if (viewDate.startDate !== Date && viewDate.endDate !== Date) {
            filteredData = filteredData.filter((data) =>
                new Date(data.up_date) >= viewDate.startDate && new Date(data.up_date) <= viewDate.endDate
            );
        }

        return filteredData;
    }, [data, filterValue, statusFilter, viewDate]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {

        setCurrentItems([]);
        setSelectedKeys(new Set([]));

        let currentItemsArray = [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        filteredItems.slice(start, end).forEach(function (value, key) {
            currentItemsArray.push(value.id);
        });

        setCurrentItems(currentItemsArray);

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const [messageApi, contextHolder] = message.useMessage();

    function copyText(cellValue) {
        setSelectedKeys(new Set([]));
        navigator.clipboard.writeText(cellValue)
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Text copied to clipboard',
                });
            })
            .catch((err) => {
                console.error("Unable to copy text to clipboard", err);
                messageApi.open({
                    type: 'error',
                    content: 'Unable to copy text to clipboard',
                });
            });
    }

    const renderCell = React.useCallback((data, columnKey) => {

        const cellValue = data[columnKey];

        const getTypeByUid = (uid) => {
            const column = columns.find(col => col.uid === uid);
            return column ? column.type : "text";
        }

        switch (getTypeByUid(columnKey)) {
            case "text":
                return (
                    <p>{cellValue}</p>
                );
            case "twoText":
                return (
                    <>
                        <p className="text-bold text-small capitalize">{cellValue.split("\n")[0]}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{cellValue.split("\n")[1]}</p>
                    </>
                );
            case "datetime":
                return (
                    <div>
                        <p className="text-bold text-small capitalize">{cellValue.split('T')[0].split('-')[2]}/{cellValue.split('T')[0].split('-')[1]}/{cellValue.split('T')[0].split('-')[0]}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{cellValue.split('T')[1].slice(0, -1).split('.')[0]}</p>
                    </div>
                );
            case "label":
                return (
                    <Chip className="capitalize" color={"primary"} size="sm" variant="flat">{cellValue}</Chip>
                );
            case "status":
                return (
                    (props.statusOptions && props.statusOptions.find((status) => status.uid === cellValue)) &&
                    <Chip className="capitalize"
                          color={props.statusOptions.find((status) => status.uid === cellValue).type} size="sm"
                          variant="flat">{props.statusOptions.find((status) => status.uid === cellValue).name}
                    </Chip>
                );
            case "statusButtons":
                return (
                    props.statusButtons &&
                    <div className="relative flex justify-end items-center gap-2">
                        {props.statusButtons && props.statusButtons.map((statusButton, index) => (
                            statusButton.currentStatus.includes(data.status) &&
                            <Button key={index} color={statusButton.type} size="sm" title={statusButton.name} isIconOnly
                                    onClick={() => statusButton.function(data.id, statusButton.uid)} variant="flat">
                                {statusButton.icon}
                            </Button>
                        ))}
                    </div>
                );
            case "buttons":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        {props.actionButtons.map((actionButton, index) => (
                            <Button key={index} color={actionButton.type} size="sm"
                                    title={actionButton.name} // isIconOnly
                                    onPress={() => actionButton.function(data.id)} variant="flat">
                                {actionButton.icon}{actionButton.text}
                            </Button>
                        ))}
                    </div>
                );
            case "menu":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300"/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {props.menuButtons && props.menuButtons.map((menuButton, index) => (
                                    <DropdownItem key={index}
                                                  onClick={() => menuButton.function(data.id)}>{menuButton.name}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            case "copy":
                return (
                    <Button size={"sm"} onClick={() => copyText(cellValue)}
                            className={"cursor-pointer active:dark:bg-zinc-900"}
                            style={{transitionDuration: ".3s", borderRadius: "30px"}} title={"Copy"}>
                        {cellValue}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"/>
                        </svg>
                    </Button>
                )
            case "icon":
                return (
                    <Avatar radius="sm" src={cellValue}/>
                )
            case "iconText":
                return (
                    <User
                        avatarProps={{radius: "lg", src: cellValue.split("\n")[0]}}
                        name={cellValue.split("\n")[1]}
                        description={cellValue.split("\n")[2]}
                    />
                )
            default:
                return cellValue;
        }
    }, [columns, copyText, props.actionButtons, props.menuButtons, props.statusButtons, props.statusOptions]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    // rows select for action handle
    useEffect(() => {
        const bulkElements = document.getElementsByClassName("bulkActions");

        if (selectedKeys.size > 0 || selectedKeys === "all") {
            Array.from(bulkElements).forEach((element) => {
                element.style.display = "inline-flex";
            });
        } else {
            Array.from(bulkElements).forEach((element) => {
                element.style.display = "none";
            });
        }
    }, [selectedKeys]);

    // update status bulk


    const topContent = React.useMemo(() => {
        return (
            <>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        <div className="flex gap-3">
                            <Dropdown className={"z-10"}>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                        Status
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    selectedKeys={statusFilter}
                                    selectionMode="multiple"
                                    onSelectionChange={setStatusFilter}
                                >
                                    {props.statusOptions && props.statusOptions.map((status) => (
                                        <DropdownItem key={status.uid} className="capitalize">
                                            {capitalize(status.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                        Columns
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    selectedKeys={visibleColumns}
                                    selectionMode="multiple"
                                    onSelectionChange={setVisibleColumns}
                                >
                                    {columns.map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Button variant={"ghost"} onClick={props.fetchTableData}>Refresh</Button>

                            {
                                selectedKeys.size > 0 || selectedKeys === "all" ?
                                <>
                                    <Button color="success" size="sm" title={"Completed"} isIconOnly
                                            onClick={() => props.handleUpdateStatusBulk(selectedKeys, 1, currentItems)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </Button>

                                    <Button color="danger" size="sm" title={"Error"} isIconOnly
                                            onClick={() => props.handleUpdateStatusBulk(selectedKeys, 2, currentItems)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                                        </svg>
                                    </Button>

                                    <Button color="warning" size="sm" title={"Pending"} isIconOnly className={"mr-3"}
                                            onClick={() => props.handleUpdateStatusBulk(selectedKeys, 0, currentItems)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                        </svg>
                                    </Button>

                                    <Button color="danger" variant={"faded"} size="sm" title={"Remove"} isIconOnly
                                            onClick={() => props.handleDeleteBulk(selectedKeys, 0, currentItems)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </Button>
                                </> : null
                            }

                            {/*<Button color="primary" endContent={<PlusIcon/>}>
                            Add New
                        </Button>*/}
                        </div>
                        <div className="flex gap-3">
                            {/*<Button onClick={() => handleSetViewDate("all")}>All</Button>*/}
                            <Button onClick={() => handleSetViewDate("today")}>Today</Button>
                            <Button onClick={() => handleSetViewDate("yesterday")}>Yesterday</Button>
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                        Monthly
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    // disallowEmptySelection
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    selectionMode="single"
                                    onSelectionChange={setMonthSelect}
                                >
                                    {monthList.map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder={`Search by ${props.searchColumn}...`}
                            startContent={<SearchIcon/>}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                        <div className="flex gap-3 w-4/12">
                            <RangePicker onChange={handleValueChange}/>
                            <Button className={"md:block hidden"}>Export</Button>
                            {/*<Button className={"md:block hidden"} onClick={exportData}>Export</Button>*/}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-default-400 text-small">Total {data.length} data</span>
                        <label className="flex items-center text-default-400 text-small">
                            Rows per page:
                            <select
                                className="bg-transparent outline-none text-default-400 text-small"
                                onChange={onRowsPerPageChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </label>
                    </div>
                </div>
            </>
        );
    }, [
        monthList,
        viewDate,
        selectedKeys,
        // props.handleUpdateStatusBulk,
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                    className={"z-0"}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [filteredItems, selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <>
            {contextHolder}
            <NextUITable
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                className={" dark:dark"}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No data found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </NextUITable>
        </>
    );
}
