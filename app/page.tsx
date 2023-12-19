import Image from "next/image";
import Navigation from "./components/Navigation";
import RoundSearchBar from "./components/RoundSearchBar";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-bgcolor">
			<div className="flex flex-col flex-grow justify-center w-[80%] items-center mx-auto space-y-16">
				<div className="flex flex-col items-center justify-center w-[80%] space-y-32">
					<div className="text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent">
						Track and Research The Market
					</div>
					<div className="flex flex-col items-center justify-center w-[60%]">
						<RoundSearchBar></RoundSearchBar>
					</div>
				</div>
				<div className="flex flex-col w-full">
					<div className="flex flex-col">
						<div className="text-white text-2xl">Trending</div>
						<div className="flex flex-row items-center justify-evenly">
							<div className="text-white">asdfasdf</div>
							<div className="text-white">asdfasdf</div>
							<div className="text-white">asdfasdf</div>
							<div className="text-white">asdfasdf</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
