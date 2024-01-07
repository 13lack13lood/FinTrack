import { isStateChanged, signOut } from "@/util/firebase/auth";
import FillButton from "../buttons/FillButton";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Authentication = () => {
	const [signedIn, setSignedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const listener = isStateChanged((user) => {
			if (user) {
				setSignedIn(true);
			} else {
				setSignedIn(false);
			}
		});

		return () => {
			listener();
		};
	}, []);

	return (
		<>
			{signedIn ? (
				<>
					<FillButton text="My Account" onClick={() => router.push("/account")} />
					<FillButton
						text="Sign out"
						onClick={async () => {
							router.push("/");
							await signOut();
							setSignedIn(false);
						}}
					/>
				</>
			) : (
				<>
					<FillButton
						text="Sign Up"
						onClick={() => {
							router.push("/signup");
						}}
					/>

					<FillButton
						text="Log In"
						onClick={() => {
							router.push("/login");
						}}
					/>
				</>
			)}
		</>
	);
};

export default Authentication;
