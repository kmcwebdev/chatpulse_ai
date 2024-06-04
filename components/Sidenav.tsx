import Button from "@/components/Button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ChartPieIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Sidenav() {

	return(<nav className="grid grid-rows-12 w-20 border border-l-[1px] min-w-fit">
				<Link href="/" className="flex items-center justify-center w-full h-full">
					<Image src="/kmc-logo.webp" alt="Company Logo" height={50} width={50} className="m-auto"/>
				</Link>
				<Button href="/conversations" className="row-start-2">
					<ChatBubbleLeftIcon className="size-7"/>
				</Button>
				<Button href="/analytics" className="row-start-3">
					<ChartPieIcon className="size-7" />
				</Button>

				<SignedIn>
					<div className="flex h-full w-full items-center justify-center row-start-12 hover:bg-accent">
						<UserButton />
					</div>
				</SignedIn>
	</nav>)
}

