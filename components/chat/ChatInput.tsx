"use client"


export default function TipTap(props : {
	content ?: string;
	onChange ?: (html : string) => void;
	onSubmit ?: () => void;
}) {
	
	// const editor = useEditor({
	// 	extensions: [StarterKit, Underline],
	// 	onUpdate: ({editor}) => {
	// 		props.onChange && props.onChange(editor?.getHTML() || "");
	// 	}
	// })

	// const handleSubmit = () =>{
	// 	if(editor?.isEmpty) return;
	// 	editor?.commands.clearContent();
	// 	props.onSubmit && props.onSubmit();
	// }

	return (
		
		// <div className="grid grid-cols-12 h-full w-full py-4">
		// 	<div className="flex items-center justify-center">
		// 		<PlusCircleIcon className="size-7 text-accent" />
		// 	</div>
		// 	<div className="flex item-center w-full h-full justify-start col-span-10 overflow-y-scroll overflow-x-hidden no-scrollbar" onClick={() => editor?.commands.focus()}>
		// 		<EditorContent editor={editor} className="w-full h-full flex items-center" onClick={() => editor?.commands.focus()}/>
		// 	</div>
		// 	<div className="flex items-center justify-center">
		// 		<PaperAirplaneIcon className="size-7 text-accent" onClick={handleSubmit}/>
		// 	</div>
		// </div>
		<div className="grid grid-cols-12 h-full w-full">
			{props.content}
		</div>
	)
}