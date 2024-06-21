import { redirect } from "next/navigation";

export default function Page() {
	redirect("/conversations/open")

	return(
		<div className="flex items-center justify-center grow">
			Something went wrong.
		</div>
	)
}