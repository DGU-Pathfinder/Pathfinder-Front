import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppFooter from "../AppFooter/AppFooter";
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