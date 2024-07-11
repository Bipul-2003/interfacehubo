'use client'
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { Navbar } from "./navbar";

const Layout = ({children}:{children:ReactNode}) => {

    const path = usePathname()
    const noNavbarRoutes = ['/sign-in', '/sign-up'];
  return (
    <div className="m-2">
        {!noNavbarRoutes.includes(path) && <Navbar/>}
        {children}
    </div>
  )
};

export default Layout;
