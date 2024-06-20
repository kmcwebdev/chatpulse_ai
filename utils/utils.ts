export function calculateTimePassed(timestamp: string): string {

	const currentTime = new Date().getTime();
	const chatTime = new Date(Number(timestamp)).getTime();
	const timeDiff = currentTime - chatTime;

	const minutes = Math.floor(timeDiff / (1000 * 60));
	if (minutes < 60) {
		return `${minutes} minutes ago`;
	}

	const hours = Math.floor(timeDiff / (1000 * 60 * 60));
	if (hours < 24) {
		
		return `${hours} hours ago`;
	}

	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

	return `${days} days ago`;
}

export function trunc(str : string, maxLength : number) : string {  
	if (str?.length>maxLength) return str.substring(0, maxLength) + " ...";  
	return str;  
}  

export function generateColor(): string {
	const number = Math.floor(Math.random() * 16777215);
	const hexColor = number.toString(16);
	return `#${hexColor}`;
}
