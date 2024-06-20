import { redirect } from "next/navigation";

export default function Home() {
	redirect("/sign-in");

	return(
		<div className="flex item-center justify-center">
			Something went wrong...
		</div>
	)
}