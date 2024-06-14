interface RoomInformationItemProps extends React.HTMLAttributes<HTMLDivElement>{
	title : string;
	description ?: string;
	children ?: React.ReactNode | React.ReactNode[]
}

export default function RoomInformationItem(props : RoomInformationItemProps) {
	return(<div>
			<p className="text-sm mb-2">{ props.title }</p>
			<div className="flex flex-row max-w-full flex-wrap gap-2 text-xs font-light text-gray-500 items-center justify-left">
				{ props.description }
				{ props.children }
			</div>
		</div>)
}