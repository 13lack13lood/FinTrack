import React from "react";

interface Props {
	params: any;
}

const page = ({ params }: Props) => {
	return <div>{params.stockID}</div>;
};

export default page;
