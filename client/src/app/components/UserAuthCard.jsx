"use client";
import { getCsrfToken, useSession, signIn, signOut } from "next-auth/react";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import { useState } from "react"

export default function UserAuthCard() {
    const [email, setEmail] = useState("");
    const authTypes = [
        'Sign In',
        'Sign Up'
    ];

    const [signIn, signUp] = authTypes;
    const tabs = [signIn, signUp];
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn("email", { email, redirect: false });
        alert("Check your email for a login link!");
    };

    const nav = {
        background: "#fdfdfd",
        padding: "5px 5px 0",
        borderRadius: "10px",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: "1px solid #eeeeee",
        height: 44,
    }

    const tabsStyles = {
        listStyle: "none",
        padding: 0,
        margin: 0,
        fontWeight: 500,
        fontSize: 14,
    }

    const tabsContainer = {
        ...tabsStyles,
        display: "flex",
        width: "100%",
    }

    const tab = {
        ...tabsStyles,
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: "100%",
        padding: "10px 15px",
        position: "relative",
        background: "white",
        cursor: "pointer",
        height: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        minWidth: 0,
        userSelect: "none",
        color: "#0f1115",
    }

    const underline= {
        position: "absolute",
        bottom: -2,
        left: 0,
        right: 0,
        height: 2,
        background: "var(--accent)",
    }

    const iconContainer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }

    return (
        <div className="
        flex flex-col overflow-hidden rounded-lg bg-white w-1/3 h-1/2
        shadow-[0_1px_1px_rgba(0,0,0,0.075),0_2px_2px_rgba(0,0,0,0.075),0_4px_4px_rgba(0,0,0,0.075),0_8px_8px_rgba(0,0,0,0.075),0_16px_16px_rgba(0,0,0,0.075),0_2px_2px_rgba(0,0,0,0.075),0_4px_4px_rgba(0,0,0,0.075),0_8px_8px_rgba(0,0,0,0.075),0_16px_16px_rgba(0,0,0,0.075)]
        ">
            <nav style={nav}>
                <ul style={tabsContainer}>
                    {tabs.map((item) => (
                        <motion.li
                            key={item}
                            initial={false}
                            animate={{
                                backgroundColor:
                                    item === selectedTab ? "#eee" : "#eee0",
                            }}
                            style={tab}
                            onClick={() => setSelectedTab(item)}
                        >
                            {`${item}`}
                            {item === selectedTab ? (
                                <motion.div
                                    style={underline}
                                    layoutId="underline"
                                    id="underline"
                                />
                            ) : null}
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <main style={iconContainer}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-10"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 rounded"
                                required
                            />
                            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                                Sign In
                            </button>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}