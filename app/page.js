'use client';

import Image from 'next/image';

import './homepage.css';
import styles from './page.module.css';
import Navigation from "@/app/components/website/Navigation";

export default function Home() {
    return (
        // <main className="test bg-light dark:bg-dark">
        <main className={styles.main}>
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

                {/*<p>*/}
                {/*    Services | Portfolio | Reports*/}
                {/*</p>*/}

                <div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {/*<Image*/}
                        {/*    src="/images/logos/dpacks-icon-black.png"*/}
                        {/*    alt="Vercel Logo"*/}
                        {/*    // className={styles.vercelLogo}*/}
                        {/*    width={140}*/}
                        {/*    height={26}*/}
                        {/*    priority*/}
                        {/*/>*/}
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
                    The Future of<br/>WWW
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
                    {/* <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                /> */}

                    <div className={"wave ai-wave-1-1"}/>
                    <div className={"wave ai-wave-1-2"}/>
                    <div className={"wave ai-wave-2"}/>
                    <div className={"wave ai-wave-3"}/>
                    {/*<div className={"wave ai-wave-4"}/>*/}
                    {/*<div className={"wave ai-wave-5"}/>*/}

                    <div className={`${styles.center}`}>

                        {/*<h1 className={`ft ft-1 `}>Hello</h1>*/}
                        {/*<h1 className={`ft ft-2 `}>the future</h1>*/}
                        {/*<h1 className={`ft ft-3 `}>of www</h1>*/}
                        {/*<h1 className={`ft ft-4 `}>starts</h1>*/}
                        {/*<h1 className={`ft ft-5 `}>here</h1>*/}

                        {/*<h1 className={`ft ft-6 `}>just</h1>*/}
                        {/*<h1 className={`ft ft-7 `}>touch</h1>*/}

                        <Image src="/images/logos/dpacks-icon-black-120.png"
                               className={"fade-in main-img-overwrites wave ai-wave-2-2"}
                               alt="DPacks Logo"
                               width={120}
                               height={120}
                               priority
                        />

                    </div>

                    {/* <div className={`ai-body ${styles.thirteen}`}>
                    <Image className={"main-img-overwrites"} src="/logo.png"
                           alt="CODUZA"
                           width={120}
                           height={120}
                           priority/>
                </div> */}

                </div>
            </div>
            </div>


            {/*<div className={styles.grid2} style={{paddingTop: "100px", paddingBottom: "70px"}}>*/}
            {/*    /!*<div style={{marginTop: "140px"}}>*!/*/}

            {/*    <div style={{width: "100%"}} className={"hero-banner"}>*/}
            {/*        <div className={"t-1"}>*/}
            {/*            <h2 className={"hero-heading"}>*/}
            {/*                Web enhancing &*/}
            {/*            </h2>*/}
            {/*            <h2 className={"hero-heading"}>*/}
            {/*                Distributed static data technology*/}
            {/*            </h2>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    /!*<div className={"hero-banner"}>*!/*/}
            {/*    /!*    <div className={"t-1"}>*!/*/}
            {/*    /!*        <h2 className={"hero-heading"}>*!/*/}
            {/*    /!*            <Link href={"/login"}>Get Started</Link>*!/*/}
            {/*    /!*        </h2>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}

            {/*    /!*<a*/}
            {/*        href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"*/}
            {/*        className={styles.card}*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*    >*/}
            {/*        <h2>*/}
            {/*            Docs <span>-&gt;</span>*/}
            {/*        </h2>*/}
            {/*        <p>*/}
            {/*            Find in-depth information about Next.js features and API.*/}
            {/*        </p>*/}
            {/*    </a>*/}

            {/*        <a*/}
            {/*        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"*/}
            {/*        className={styles.card}*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*        <h2>*/}
            {/*        Templates <span>-&gt;</span>*/}
            {/*        </h2>*/}
            {/*        <p>Explore the Next.js 13 playground.</p>*/}
            {/*        </a>*/}

            {/*        <Link className={styles.card}*/}
            {/*        href={"services"}*/}
            {/*        shallow={true}*/}
            {/*        >*/}
            {/*        <h2>*/}
            {/*        Services <span>-&gt;</span>*/}
            {/*        </h2>*/}
            {/*        <p>*/}
            {/*        Instantly deploy your Next.js site to a shareable URL with Vercel.*/}
            {/*        </p>*/}
            {/*        </Link>*!/*/}
            {/*</div>*/}

            {/* section 2 */}
            <div className={"section-2"}>
                <div style={{padding: "200px"}}>
                    <h1>
                        We build <strike>machines</strike>
                    </h1>
                    <h1 className={` breath-ani`}>organisms</h1>
                    <h1 className={` breath-ani-under`}>
                        in the cloud to unleash<br/>your ideas digitally.
                    </h1>
                    {/* <br/>
                        <p>Draft keywords (for content writing) <span>👇</span></p>
                        <p>Algorithms, Data & AI.</p>
                        <p>Breathing technologies</p>
                        <p>Focus, simplicity, automation, and convenience</p> */}
                </div>

                <div className={`diagram ${styles.grid}`}>

                    <div className={"con-mid"}>
                        <div className={"flow-block backend-flow"}>
                            Backend
                        </div>
                    </div>

                    <div className={"con-mid"}>
                        <div className={`${styles.grid1}`}>
                            <div className={"con-mid"}>
                                <div className={"flow-block"}>
                                    UI/UX Designing
                                </div>
                            </div>
                            <div className={"con-mid"}>
                                <div className={`${styles.grid2}`}>
                                    <div className={"con-mid"}>
                                        <div className={"flow-block"}>
                                            Frontend
                                        </div>
                                    </div>
                                    <div className={"con-mid"}>
                                        <div className={"flow-block"}>
                                            Frontend
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"con-mid"}>
                        <div className={`diagram ${styles.grid1}`}>
                            <div className={"con-mid"}>
                                <div className={"flow-block"}>
                                    Continuous Integration (CI)
                                </div>
                            </div>
                            <div className={"con-mid"}>
                                <div className={"flow-block"}>
                                    Containerization
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* <div className={`diagram ${styles.grid4}`}>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Version Control
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Continuous Integration (CI)
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Configuration Management (CM)
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Containerization
                        </div>
                    </div>
                </div> */}

                <div className={`diagram ${styles.grid1}`}>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Deployment
                        </div>
                    </div>
                </div>

                <br/><br/><br/><br/>

                <div className={`diagram ${styles.grid}`}>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Monitoring
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Collaboration
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Testing
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Infrastructure as Code (IaC)
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Source Code Management (SCM)
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Continuous Delivery (CD)
                        </div>
                    </div>
                </div>

                <br/><br/><br/><br/>

                <div className={`diagram ${styles.grid2}`}>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Digital Marketing
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Multimedia Production
                        </div>
                    </div>
                </div>

            </div>


            <div className={"section-3"}>
                <div style={{padding: "200px"}}>
                    <h1>Footer</h1>
                </div>
            </div>

            {/*</main>*/}
        </main>
    );

}
