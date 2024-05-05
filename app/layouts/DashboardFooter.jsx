'use client';

import useDarkMode from "@/app/hooks/useDarkMode";
import {Badge} from "antd";
import Link from "next/link";
import {GithubOutlined, MailOutlined} from "@ant-design/icons";

export default function DashboardFooter() {

    const [isDarkMode, toggleDarkMode] = useDarkMode();

    const logoSrc = isDarkMode
        ? '/images/logos/dpacks-logo-white.png'
        : '/images/logos/dpacks-logo-dark.png';

    return (
        <div className={"w-full p-6 pr-12 pl-12 dark:bg-secondaryDark grid grid-cols-1 gap-4 md:gap-0"}
             style={{
                 marginBottom: "-1px",
                 marginTop: "-1px"
             }}
        >
            <div className={"grid text-center md:text-left grid-cols-1 md:grid-cols-2"}>
                <p style={{fontSize: "11px", color: "#fff"}} className={"mb-2"}>
                    &copy; {new Date().getFullYear()} DPacks. All rights reserved.
                </p>
                <p style={{fontSize: "10px"}} className={"dark:text-darkTernary md:text-right"}>
                    <Link href={"/privacy"}>Privacy Policy</Link>
                    <span className={"pl-2 pr-2"}>•</span>
                    <Link href={"/terms"}>Terms & Conditions</Link>
                </p>
            </div>
            <div className={"grid text-center md:text-left grid-cols-1 md:grid-cols-2 gap-2 md:gap-0"}>
                <p style={{fontSize: "10px"}} className={"dark:text-dark"}>
                    <Badge status="success" className={"pr-2"}/>All Systems Operational
                </p>
                <p style={{fontSize: "14px"}} className={"dark:text-darkSecondary md:text-right"}>
                    <Link href={"https://github.com/dpacks-technology"}>
                        <GithubOutlined className={"pr-2 pl-2"}/>
                    </Link>
                    <a href={"mailto:info@dpacks.net"}>
                        <MailOutlined className={"pr-2 pl-2"}/>
                    </a>
                </p>
            </div>
        </div>
    )
}