"use client"
import {Card} from 'antd';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useCallback, useEffect, useState} from "react";
import {
    getTotalApiSubscribersCount,
    getTotalMarketPlaceUsersCount,
    getTotalUserCount,
    getTotalWebsitesCount
} from "@/services/AdminDashboardService";
import {getAdminsCount} from "@/services/AdminManagementService";

export default function AdminDashboard() {
    const [totUsersHeader, setTotUsersHeader] = useState("Total Users");
    const [totUsers, setTotUsers] = useState(500);
    const [totSitesHeader, setTotSitesHeader] = useState("Total Sites");
    const [totSites, setTotSites] = useState(10000);
    const [totApiSubscribersHeader, setTotApiSubscribersHeader] = useState("Total API Subscribers");
    const [totApiSubscribers, setTotApiSubscribers] = useState(10);
    const [totMarketPlaceUsersHeader, setTotMarketPlaceUsersHeader] = useState("Total Marketplace Users");
    const [totMarketPlaceUsers, setTotMarketPlaceUsers] = useState(50);
    const [selectedItem1, setSelectedItem1] = useState("");
    const [selectedItem2, setSelectedItem2] = useState("");
    const [selectedItem3, setSelectedItem3] = useState("");
    const [selectedItem4, setSelectedItem4] = useState("");

    const items = [
        {
            key: "totUsers",
            label: totUsersHeader,
        },
        {
            key: "totSites",
            label: totSitesHeader,
        },
        {
            key: "totApiSubscribers",
            label: totApiSubscribersHeader,
        },
        {
            key: "totMarketPlaceUsers",
            label: totMarketPlaceUsersHeader,
        }
    ];
    const cardOneHandleItemClick = (key) => {
        setSelectedItem1(key);
    };

    const cardTwoHandleItemClick = (key) => {
        setSelectedItem2(key);
    };

    const cardThreeHandleItemClick = (key) => {
        setSelectedItem3(key);
    };

    const fetchTotalCounts = useCallback(async () => {
        try {
            // Fetch total user count from API
            getTotalUserCount().then((response) => setTotUsers(response));
            getTotalWebsitesCount().then((response) => setTotSites(response));
            getTotalApiSubscribersCount().then((response) => setTotApiSubscribers(response));
            getTotalMarketPlaceUsersCount().then((response) => setTotMarketPlaceUsers(response));
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchTotalCounts().then(r => console.log(r));
        },[fetchTotalCounts]);


    return (
            <div className="flex flex-row gap-4 justify-around">
                <Card  style={{ width: 300 }}>
                    <div className="bg-accentDark">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered">
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item) => (
                                    <DropdownItem
                                        key = {item.key}
                                        color={item.key === "totUsers" ? "danger" : "default"}
                                        className={item.key === "delete" ? "text-danger" : ""}
                                        onClick={() => cardOneHandleItemClick(item.key)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {items.map((item) => (
                    <div key={item.key} className="bg-amber-800">
                        {selectedItem1 === item.key ? (
                            <>
                                <h2>{item.label}</h2>
                                <p>
                                    {item.key === "totUsers" && totUsers}
                                    {item.key === "totSites" && totSites}
                                    {item.key === "totApiSubscribers" && totApiSubscribers}
                                    {item.key === "totMarketPlaceUsers" && totMarketPlaceUsers}
                                </p>
                            </>
                        ) : null}
                    </div>
                    ))}
                </Card>

                <Card style={{ width: 300 }}>
                    <div className="bg-accentDark">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered">
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item) => (
                                    <DropdownItem
                                        key={item.key}
                                        color={item.key === "delete" ? "danger" : "default"}
                                        className={item.key === "delete" ? "text-danger" : ""}
                                        onClick={() => cardTwoHandleItemClick(item.key)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {items.map((item) => (

                    <div key={item.key} className="bg-amber-300">
                        {selectedItem2 === item.key ? (
                            <>
                                <h2>{item.label}</h2>
                                <p>
                                    {item.key === "totUsers" && totUsers}
                                    {item.key === "totSites" && totSites}
                                    {item.key === "totApiSubscribers" && totApiSubscribers}
                                    {item.key === "totMarketPlaceUsers" && totMarketPlaceUsers}
                                </p>
                            </>
                        ) : null}
                    </div>
                    ))}
                </Card>
                <Card style={{width: 300}}>
                    <div className="bg-accentDark">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered">
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item) => (
                                    <DropdownItem
                                        key={item.key}
                                        color={item.key === "delete" ? "danger" : "default"}
                                        className={item.key === "delete" ? "text-danger" : ""}
                                        onClick={() => cardThreeHandleItemClick(item.key)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {items.map((item) => (
                    <div key={item.key} className="bg-amber-800">
                        {selectedItem3 === item.key ? (
                            <>
                                <h2>{item.label}</h2>
                                <p>
                                    {item.key === "totUsers" && totUsers}
                                    {item.key === "totSites" && totSites}
                                    {item.key === "totApiSubscribers" && totApiSubscribers}
                                    {item.key === "totMarketPlaceUsers" && totMarketPlaceUsers}
                                </p>
                            </>
                        ) : null}
                    </div>
                    ))}
                </Card>

            </div>
    );
}