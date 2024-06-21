import Card from "@/components/Card"

export default function AnalyticsFeedbackPage() {
	//We can display an aggregate of the total ratings for each day.
	return(
		<div className="grid grid-rows-12 h-full w-full">
			<div className="grid row-span-3 grid-cols-3">
				<Card title="Test" />
				<Card title="Test" />
				<Card title="Test" />
			</div>
		</div>
	)
}