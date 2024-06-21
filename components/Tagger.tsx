import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Tagger(props: {
	title?: string;
	items?: string[];
	selectedItems?: string[];
	className?: string;
	onChange?: (e: string[]) => void;
}) {
	const taggerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isSelected, setIsSelected] = useState(false);
	const [items, setItems] = useState<string[]>(props.items ?? []);
	const [searchValue, setSearchValue] = useState("");
	const [selectedItems, setSelectedItems] = useState<string[]>(props.selectedItems ?? []);
	const [similarItems, setSimilarItems] = useState<string[]>();

	useEffect(() => {
		const similar = items?.filter((value: string) => {
			if(value == undefined || value == null) 
				return;

			return value.toLowerCase().includes(searchValue.toLowerCase());
		}).sort();
		setSimilarItems(similar);
	}, [searchValue, items]);

	useEffect(() => {
		if (props.onChange) props.onChange(selectedItems);
	}, [selectedItems, props]);

	useEffect(() => {
		const filteredItems = items.filter(item => !selectedItems.includes(item));
		setItems(filteredItems);
	}, [selectedItems, items]);

	useEffect(() => {
		const handleClickInside = (event: MouseEvent) => {
			if(taggerRef.current && taggerRef.current.contains(event.target as Node)) {
				setIsSelected(true);
				inputRef.current?.focus();
			}
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (taggerRef.current && !taggerRef.current.contains(event.target as Node)) setIsSelected(false);
		};
		window.addEventListener('click', handleClickOutside);
		window.addEventListener('click', handleClickInside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
			window.removeEventListener('click', handleClickInside);
		};
	}, [isSelected]);

	useEffect(() => {
	  const handleKeyPress = (e: any) => {
			if (e.key === "Enter" && isSelected && similarItems && similarItems.length > 0) {
				handleResultItemClick(similarItems[0]);
			}
	  };
	  window.addEventListener('keydown', handleKeyPress);

	  return () => {
		window.removeEventListener('keydown', handleKeyPress);
	  };
	}, [isSelected, similarItems]);

	useEffect(() => {
		const handleBackspace = (e: any) => {
			if (e.key === "Backspace" && e.target.value === "" && selectedItems && selectedItems.length > 0) {
				handleSelectedItemClick(selectedItems[selectedItems.length - 1])
			}
		};
		window.addEventListener("keydown", handleBackspace);

		return () => {
			window.removeEventListener("keydown", handleBackspace);
		};
	}, [isSelected, selectedItems]);



	const handleResultItemClick = (value: string) => {
		setSelectedItems([...selectedItems, value]);
		setItems(items.filter(item => item !== value));
		setSearchValue("");
	};

	const handleSelectedItemClick = (value: string) => {
		setSelectedItems(selectedItems.filter(item => item !== value));
		setItems([...items, value]);
	};

	return (
		<div  className={`relative w-full`} >
			<label className="label">
				<span className="label-text">{props.title}</span>
			</label>
			<div ref={taggerRef} className="flex flex-wrap input input-bordered items-center justify-start w-full max-w-full min-h-12 h-fit gap-1 p-1 overflow-hidden">
				{selectedItems?.map((value: string, index: number) => (
					<TaggerItem key={index} title={value} onClick={() => handleSelectedItemClick(value)} />
				))}
				<input ref={inputRef} type="text" value={searchValue} className="min-w-fit max-w-fit w-[5px] px-2" onChange={(e) => setSearchValue(e.target.value)} onClick={() => setIsSelected(true)} />
			</div>
			<TaggerResult className={isSelected ? "inline-block" : "hidden"}>
				{similarItems?.map((value: string, index: number) => (
					<TaggerResultItem key={index} title={value} onClick={() => handleResultItemClick(value)} />
				)) ?? null}
			</TaggerResult>
		</div>
	);
}

function TaggerResult(props: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`absolute my-2 flex flex-col w-full bg-white border rounded-lg p-2 space-y-2 max-h-24 overflow-y-scroll overflow-x-hidden ${props.className}`}>
			{props.children}
		</div>
	);
}

function TaggerResultItem(props: {
	title: string;
	onClick?: () => void;
}) {
	return (
		<button className="text-left hover:bg-accent rounded-lg p-1" onClick={props.onClick}>{props.title}</button>
	);
}

function TaggerItem(props: {
	title: string;
	onClick?: () => void;
}) {
	return (
		<span className="flex flex-row text-xs p-1 rounded-lg bg-neutral text-white max-w-fit items-center justify-center">
			{props.title}
			<button className="h-full w-fit rounded-md hover:bg-secondary" onClick={props.onClick}>
				<XMarkIcon className="size-4" />
			</button>
		</span>
	);
}
