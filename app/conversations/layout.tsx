import Sidenav from "@/components/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
		<div className="flex flex-row h-screen min-w-fit">
			<Sidenav />
			{ children }
		</div>
  );
}