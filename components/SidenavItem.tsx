'use client'
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SideNavItem(props: {
	title: React.ReactNode | string;
	className?: string;
	children?: React.ReactNode | string;
	isActive ?: boolean;
	href ?: string;
	hoverable ?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const pathName = usePathname();
	const router = useRouter();

	const hoverable = props.hoverable == undefined ? true : props.hoverable;

	const handleClick = () => {
		if(props.children) setIsOpen(!isOpen);
		else if (props.href) router.push(props.href)
	};

	return (
		<div className="flex flex-col min-h-fit w-full">
			<div
				className={`flex items-center justify-between min-h-fit px-2 rounded-md py-3 font-semibold text-gray-500 text-xs   ${
					props.href && pathName.includes(props.href) ? "text-slate-950 bg-accent" : hoverable ?  "hover:bg-gray-100 hover:text-slate-950 hover:cursor-pointer" : "bg-white"	
				} ${
					props.href && pathName.includes(props.href) && props.children ? "bg-gray-100" : ""
				}
				`}
				onClick={handleClick}
			>
				<div className="flex w-full items-center justify-between">
					<div className="flex space-x-2 items-center">{props.title}</div>
				</div>
				{props.children && <ChevronDownIcon className={`size-3 transition-all ${isOpen ? "rotate-180" : "rotate-0"}`} />}
			</div>
				{isOpen && props.children ? (<div className="ml-2 mt-1 space-y-1">{props.children}</div>) : null}
		</div>
	);
}