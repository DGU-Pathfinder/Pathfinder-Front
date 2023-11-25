import React from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import "./AppLayout.scss"

function AppLayout({ children }) {
    return (
        <>
            <AppHeader />
            <body>
                {children}
            </body>
            <AppFooter />
        </>
    )
}

export default AppLayout;