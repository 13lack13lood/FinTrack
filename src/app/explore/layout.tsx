import ExploreButtonArray from "@/src/components/explore/ExploreButtonArray";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ExploreButtonArray />
			<main>{children}</main>
		</>
	);
};

export default Layout;
