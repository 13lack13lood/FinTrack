import StockList from "@/src/components/explore/StockList";
import { fetchExploreData } from "@/util/backendFetchData";

const page = async () => {
	const data = await fetchExploreData("gainers");

	return (
		<div className="flex flex-col justify-center p-4 mx-10">
			<StockList data={data} />
		</div>
	);
};

export default page;
