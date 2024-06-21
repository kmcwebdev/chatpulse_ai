export default function Card(props: {
	title?: string | React.ReactNode;
	description?: string;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={`${props.className} border card shadow-sm m-2`}>
			<div className="card-body p-4">
				{props.title && <div className="card-title text-base w-full">{props.title}</div>}
				{props.description && <p>{props.description}</p>}
				{props.children}
			</div>
		</div>
	);
}