'use client';

import Image from 'next/image';

import './homepage.css';
import styles from './page.module.css';
import Navigation from "@/app/components/website/Navigation";
import DashboardFooter from "@/app/layouts/DashboardFooter";
import React from "react";

export default function Home() {
    return (
        <main className={`${styles.main}`}>
            <Navigation/>
            <div className={"back-container"}>

                {/*  gradient elements  */}
                <div className={"grad-1"}/>
                {/* l - u */}
                <div className={"grad-2"}/>
                {/* l - m */}
                <div className={"grad-4"}/>
                {/* l - d */}
                <div className={"grad-5"}/>
                {/* r - u */}
                <div className={"grad-3"}/>
                {/* r - m */}
                <div className={"grad-6"}/>
                {/* r - d */}

                <div className={"grad-8"}/>
                {/* u - l */}
                <div className={"grad-7"}/>
                {/* u - r */}

            </div>

            <div className={styles.description}>
                <div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>
                </div>
            </div>

            <div className={"grid grid-cols-2 gap-4 w-full z-40"}
                 style={{
                     zIndex: 0,
                     height: "76vh"
                 }}
            >
                <div className={"con-mid"} style={{
                    alignItems: "start"
                }}>
                    <h1
                        style={{
                            fontWeight: "bold",
                            lineHeight: "1",
                            fontSize: "5rem",
                            zIndex: 1
                        }}
                    >
                        The Future of<br/>Web
                    </h1>

                    <p
                        className={"text-lightSecondary mt-2"}
                        style={{
                            zIndex: 1
                        }}
                    >
                        Web Enhancing & Distributed Static Data Technology
                    </p>

                </div>
                <div className={"con-mid"}>
                    <div className={`launchpad ${styles.center}`}>
                        <div className={"wave ai-wave-1-1"}/>
                        <div className={"wave ai-wave-1-2"}/>
                        <div className={"wave ai-wave-2"}/>
                        <div className={"wave ai-wave-3"}/>
                        <div className={`${styles.center}`}>
                            <Image src="/images/logos/dpacks-icon-black-120.png"
                                   className={"fade-in main-img-overwrites wave ai-wave-2-2"}
                                   alt="DPacks Logo"
                                   width={120}
                                   height={120}
                                   priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className={"section-2"}>
                <div className={"container pt-36 mb-4"} style={{lineHeight: "1"}}>
                    <h1 style={{fontSize: "36px"}}>
                        DPacks do care about web
                    </h1>
                    <h1 style={{fontSize: "64px"}}>data</h1>
                </div>
                <div className={`diagram ${styles.grid}`}>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Static Data
                            <p className={"text-xs text-darkSecondary pt-3"}>
                                DPacks manages and delivers static data in a distributed under ultra low latency.
                            </p>
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Personalized Data
                            <p className={"text-xs text-darkSecondary pt-3"}>
                                DPacks provides personalization data for an enhanced user experience.
                            </p>
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Data Crawling
                            <p className={"text-xs text-darkSecondary pt-3"}>
                                DPacks provides updated data for search engine crawlers through DPacks API.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <div className={"section-4 pt-24 pb-24"}>
                <div className={"container"} style={{lineHeight: "1"}}>
                    <h1 style={{fontSize: "36px"}}>
                        DPacks integrates
                    </h1>
                    <h1 style={{fontSize: "64px"}}> all web needs</h1>
                </div>
                <p className={"mt-12 text-darkSecondary"}>
                    DPacks introduces the world&apos;s first distributed static data technology, revolutionizing web data
                    delivery. Moreover, DPacks offers an all-in-one web addons platform for web developers, encompassing
                    web chat services, web analytics, and more in the forthcoming updates. With this integrated
                    platform, managing all your web requirements becomes effortless.
                </p>
            </div>

            <div className={"section-4 pt-12 pb-36"}>
                <h1 style={{fontSize: "36px", textAlign: "center"}}>
                    DPacks enhances your web...
                </h1>
            </div>

            <div
                style={{
                    width: "100vw",
                }}
            >
                <DashboardFooter/>
            </div>
        </main>
    );

}
