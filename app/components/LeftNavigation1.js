// LeftNavigation1.js
import React from 'react';

import {UserDashboardNavigation} from "@/app/data/UserDashboardNavigation";
import Link from "next/link";

const LeftNavigation1 = () => {
    return (<nav className="bg-secondaryDark w-16 h-full fixed top-0 pt-3 left-0 ">

            {/* user */}
            <Link href="/u" className="p-4 text-white grid justify-center hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1}
                     stroke="currentColor" className="w-full h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                </svg>
            </Link>

            {UserDashboardNavigation.map((item, index) => (
                <Link key={index} href={item.url} className="grid justify-center p-4 text-white hover:bg-gray-700">
                    {item.icon}
                    <p className="text-xs font-normal mt-1" style={{fontSize: "10px"}}>{item.name}</p>
                </Link>
            ))}

        </nav>
    );
};

export default LeftNavigation1;
