"use client"

import Footer from "./Footer";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()

    return (
        <>
            {pathname.split("/")[1] !== "admin" ? <><Header /> {children} <Footer /></> : children}
        </>
    );
}