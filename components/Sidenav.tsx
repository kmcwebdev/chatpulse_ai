{/* Library Imports */}
import { ArrowLeftStartOnRectangleIcon, ChartPieIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

{/* Component Imports */}

export default function Sidenav() {
	return(<nav className={`flex flex-col items-center justify-between py-4 px-4 bg-slate-600 space-y-10 text-[#c1dbfc]`}>
		<Image src="/download.png" alt="Company Logo" height={50} width={50} />
		<div className="flex flex-col items-center justify-between grow">
			<div className="flex flex-col grow space-y-10">
				<Button>
					<ChatBubbleLeftIcon  className="size-7" />
				</Button>
				<Button>
					<ChartPieIcon className="size-7" />					
				</Button>
			</div>
			<Button>
				<ArrowLeftStartOnRectangleIcon className="size-7"/>
			</Button>
		</div>
	</nav>)
}

function Button(props : {children : React.ReactNode}) {
	return(<div className="btn bg-inherit border-none shadow-none text-white hover:bg-slate-700">
		{props.children}
	</div>)
}