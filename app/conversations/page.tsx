import ConversationsList from "@/components/ConversationsList";
import ConversationLiveView from "@/components/ConverstionLiveView";

export default function Page() {
	return(<div className="flex flex-row grow items-center">
		<ConversationsList />
		<ConversationLiveView />
	</div>)
}