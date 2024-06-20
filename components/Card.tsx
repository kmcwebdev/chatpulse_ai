export default function Card(props: {
	title?: string | React.ReactNode;
	description?: string;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={`${props.className} bg-white card shadow-sm m-2`}>
			<div className="card-body">
				{props.title && <div className="card-title">{props.title}</div>}
				{props.description && <p>{props.description}</p>}
				{props.children}
			</div>
		</div>
	);
}