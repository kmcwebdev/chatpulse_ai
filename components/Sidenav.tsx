import Button from "@/components/Button";
import { ArrowLeftStartOnRectangleIcon, ChartPieIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Sidenav() {
	return(
		<nav className={`flex flex-col items-center justify-between py-4 px-4 space-y-10 border-r-[1px] border-primary`}>
			<Image src="/download.png" alt="Company Logo" height={50} width={50} />
			<div className="flex flex-col items-center justify-between grow">
				<div className="flex flex-col grow space-y-10">
					<Button href="#">
						<ChatBubbleLeftIcon className="size-7"/>
					</Button>
					<Button href="#">
						<ChartPieIcon className="size-7"/>
					</Button>
				</div>
					<Button href="#">
						<ArrowLeftStartOnRectangleIcon className="size-7"/>
					</Button>
			</div>
		</nav>
	)
}
