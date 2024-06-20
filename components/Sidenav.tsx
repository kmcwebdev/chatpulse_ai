'use client'
import SideNavItem from "@/components/SidenavItem";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChatBubbleLeftRightIcon, ClipboardDocumentIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Sidenav() {

	const user = useUser().user;

	return (
		<nav className="flex flex-col border-r-[1px] px-3 py-2 min-w-60 items-start justify-start space-y-1">
			<Link href="/" className="flex items-center justify-center py-4">
				<Image priority={true} src="/kmc-logo-large.png" alt="Company Logo" height={100} width={160} className="w-28" />
			</Link>
			<SideNavItem
				title={
					<>
						<ChatBubbleLeftRightIcon className="size-5" />
						<span>Conversations</span>
					</>
				}
				href="/conversations"
			>
			<SideNavItem title="Open" href="/conversations/open"/>
			<SideNavItem title="Closed" href="/conversations/closed"/>
			</SideNavItem>
			<SideNavItem title={<span className="text-xs font-semibold">ANALYTICS</span>} hoverable={false}/>
			<SideNavItem
				title={
					<>
						<ClipboardDocumentIcon className="size-5" />
						<span className="text-xs font-semibold">Summary</span>
					</>
				}
				href="/analytics/summary"
			/>
			<SideNavItem
				title={
					<>
						<ClipboardDocumentIcon className="size-5" />
						<span className="text-xs font-semibold">Chat</span>
					</>
				}
				href="/analytics/chat"
			>
				<SideNavItem
						title={
							<>
								<span className="text-xs font-semibold">Feedback</span>
							</>
						}
						href="/analytics/chat/feedback"
					/>
				<SideNavItem
						title={
							<>
								<span className="text-xs font-semibold">Tags</span>
							</>
						}
						href="/analytics/chat/tags"
					/>
			</SideNavItem>
			<SideNavItem
				title={
					<>
						<DocumentMagnifyingGlassIcon className="size-5" />
						<span className="text-xs font-semibold">Search</span>
					</>
				}
			/>
			<div className="flex grow items-end justify-end p-2">
				<div className="flex flex-row space-x-3">
					<UserButton />
					<div className="flex flex-col">
						<span className="text-xs font-bold">
							{user?.username || user?.firstName || user?.lastName}
						</span>
						<span className="text-xs text-slate-500">
							{user?.primaryEmailAddress?.toString()}
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
}

