import React from "react";
import Image from "next/image";
import styles from "./NavSearchBar.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NavSearchBar = () => {
	const [inputQuery, setInputQuery] = useState("");
	const router = useRouter();

	const searchHandler = () => {
		if (inputQuery != "") router.push("/stocks/" + inputQuery);
	};

	return (
		<div className="w-fit h-fit relative">
			<button className={styles.btnSearch}>
				<Image src="/search.svg" alt="search icon" width="40" height="40"></Image>
			</button>
			<input
				type="text"
				className={`${styles.inputSearch}`}
				placeholder="Type to Search..."
				value={inputQuery}
				onChange={(event) => setInputQuery(event.currentTarget.value)}
				onKeyDown={(event) => {
					if (event.key == "Enter") {
						setInputQuery(event.currentTarget.value);
						searchHandler();
						setInputQuery("");
					}
				}}
			></input>
		</div>
	);
};

export default NavSearchBar;
