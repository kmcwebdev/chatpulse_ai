import ChatPopup from "@/components/chat/ChatPopup";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (<>
		<div className="relative flex h-screen w-screen justify-center items-center" style={{ backgroundImage: "url(/landingpage-pic.jpg)" }}>
			<SignIn />
		</div>
		<ChatPopup/>
	</>
	);
}