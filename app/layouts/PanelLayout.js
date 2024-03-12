'use client';

import SearchBar from "@/app/components/SearchBar";
import useDarkMode from "@/app/hooks/useDarkMode";
import LeftNavigation1 from "@/app/components/LeftNavigation1";
import LeftNavigation2 from "@/app/components/LeftNavigation2";
import RightNavigation1 from "@/app/components/RightNavigation1";
import DateTimePickers from "../components/DateTimePicker";
import DatePickerRange from "../components/DatePickerRange";

export default function PanelLayout({ children }) {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    const logoSrc = isDarkMode
        ? '/images/logos/dpacks-logo-white.png'
        : '/images/logos/dpacks-logo-dark.png';

    return (
        <div>
            <nav
                className=" top-0 z-50 bg-light border-b border-transparent dark:bg-dark dark:border-transparent"
                style={{ marginLeft: "64px" }}
            >
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar" type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                                </svg>
                            </button>
                            <a href="https://dpacks.net" className="flex ms-2">
                                <img src={logoSrc} className="w-32 " alt="Dpacks Logo" />
                            </a>
                        </div>
                        <SearchBar className={"content-start"} />
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full"
                                            src="/images/profile-picture/profile.svg"
                                            alt="user photo" />
                                    </button>
                                </div>
                                <div
                                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                            role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-transparent border-r border-transparent sm:translate-x-0 dark:bg-transparent dark:border-transparent"
                aria-label="Sidebar">
                <LeftNavigation1 />
                <LeftNavigation2 />
            </aside>
            <div className="sm:ml-72">
                <div
                    className="p-4 mt-2 rounded-2xl bg-secondaryLight dark:bg-secondaryDark fixed overflow-scroll"
                    style={{ width: "calc(100% - 367px)", height: "calc(100% - 100px)" }}>
                    {children}
                </div>
            </div>
            <aside id="logo-sidebar"
                className="fixed top-0 right-0 z-40 h-screen pt-20 transition-transform -translate-x-full bg-transparent border-r border-transparent sm:translate-x-0 dark:bg-transparent dark:border-transparent"
                aria-label="Sidebar">
                <RightNavigation1 />
            </aside>
        </div>
    )
}