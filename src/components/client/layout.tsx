"use client"

import { fetchPages } from "@/utils/public";
import Footer from "./Footer";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()

    useEffect(() => {

        async function generateStaticParams() {
            const pages = await fetchPages();
            console.log(pages, "__pages__-");
            //  return pages.map((p) => ({ slug: p.slug }));
        }
        generateStaticParams()
    }, [])

    return (
        <>
            {pathname.split("/")[1] === "admin" ||
                pathname.split("/")[1] === "login" ||
                pathname.split("/")[1] === "dashboard" ? children :
                <><Header /> {children} <Footer /></>
            }
        </>
    );
}