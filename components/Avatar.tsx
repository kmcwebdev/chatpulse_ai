import Image from "next/image";

interface AvatarProps {
	url: string;
	width : number;
	height: number;
	className ?: string;
}

export default function Avatar(props: AvatarProps) {
	return(<div className={`${props.className} avatar`}>
		<Image className="rounded-full" src={props.url} alt="Avatar" height={props.height} width={props.width} />
	</div>)
}