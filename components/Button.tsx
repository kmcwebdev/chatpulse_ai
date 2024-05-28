import Link, { LinkProps } from 'next/link';

interface ButtonProps extends LinkProps {
	children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
		return(<Link 
		href={props.href}
		className="btn bg-inherit border-none shadow-none hover:bg-accent hover:shadow-sm text-primary">
			{props.children}
		</Link>)
}