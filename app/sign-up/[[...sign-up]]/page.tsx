import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex h-screen w-screen justify-center items-center" style={{ backgroundImage: "url(/landingpage-pic.jpg)" }}>
			<SignUp />
		</div>
	);
}