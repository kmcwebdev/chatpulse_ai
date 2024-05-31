import Link, { LinkProps } from 'next/link';

interface ButtonProps extends LinkProps {
	children?: React.ReactNode;
	className?: string;
}

export default function Button(props: ButtonProps) {
		return(<Link 
		href={props.href}
		className={`flex items-center justify-center w-full h-full bg-inherit hover:bg-accent p-5 ${props.className}`}>
			{props.children}
		</Link>)
}

//btn bg-inherit border-none shadow-none hover:bg-accent hover:shadow-sm text-primary