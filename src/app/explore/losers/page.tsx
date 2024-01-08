import StockList from "@/src/components/explore/StockList";
import { fetchExploreData } from "@/util/backendFetchData";

const Page = async () => {
    const data = await fetchExploreData("losers");

    return (
        <div className="flex flex-col justify-center p-4 mx-10">
            <StockList data={data} />
        </div>
    );
};

export default Page;
