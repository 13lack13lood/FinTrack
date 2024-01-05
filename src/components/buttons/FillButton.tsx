import React from "react";
import styles from "../../styles/FillButton.module.css";

interface Props {
	text: string;
	onClick: () => void;
}

const FillButton = ({ text, onClick }: Props) => {
	return (
		<button type="submit" className={styles.p} onClick={() => onClick()}>
			{text}
			<span className={styles.pf}></span>
			<span className={styles.pf}></span>
			<span className={styles.pf}></span>
			<span className={styles.pf}></span>
		</button>
	);
};

export default FillButton;
