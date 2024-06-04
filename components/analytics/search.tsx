import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search(props: {
	className ?: string;
	children ?: React.ReactNode | React.ReactNode[];
}) {
	return(<div className={`${props.className} grid grid-rows-12`}>
		<h1 className="row-span-1">Search</h1>
		<div className="flex justify-between row-start-2 row-span-1 border-b-[1px]   m-4">
			<input type="text" placeholder="Search " className="h-full w-full px-4 e focus:outline-none"/>
			<span className="px-4">
				<MagnifyingGlassIcon className="size-5 text-slate-400" />
			</span>
		</div>
	</div>)
}