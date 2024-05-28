'use server'
import { ConversationItemProps } from '@/components/conversations/ConversationItem';

export async function getConversationsByStatus(tab: string) : Promise<ConversationItemProps[]>{

	switch(tab) {
		case "New":
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							id: "1",
							title: "Conversation 1",
							description: "This conversation is New",
							timePassed: 60,
							participantCount: 3,
							isActive: true
						},
						{
							id: "2",
							title: "Conversation 2",
							description: "This conversation is New",
							timePassed: 120,
							participantCount: 5,
							isActive: false
						},
						{
							id: "3",
							title: "Conversation 3",
							description: "This conversation is New",
							timePassed: 180,
							participantCount: 2
						}
					]);
				}, 3000);
			});
		case "Open":
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							id: "1",
							title: "Conversation 1",
							description: "This conversation is Open",
							timePassed: 60,
							participantCount: 3,
							isActive: true
						},
						{
							id: "2",
							title: "Conversation 2",
							description: "This conversation is Open",
							timePassed: 120,
							participantCount: 5,
							isActive: false
						},
						{
							id: "3",
							title: "Conversation 3",
							description: "This conversation is Open",
							timePassed: 180,
							participantCount: 2
						}
					]);
				}, 3000);
			});
		case "Closed":
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							id: "1",
							title: "Conversation 1",
							description: "This conversation is Closed",
							timePassed: 60,
							participantCount: 3,
							isActive: true
						},
						{
							id: "2",
							title: "Conversation 2",
							description: "This conversation is Closed",
							timePassed: 120,
							participantCount: 5,
							isActive: false
						},
						{
							id: "3",
							title: "Conversation 3",
							description: "This conversation is Closed",
							timePassed: 180,
							participantCount: 2
						}
					]);
				}, 3000);
			});
		default:
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							id: "1",
							title: "Conversation 1",
							description: "This conversation is Closed",
							timePassed: 60,
							participantCount: 3,
							isActive: true
						},
						{
							id: "2",
							title: "Conversation 2",
							description: "This conversation is Closed",
							timePassed: 120,
							participantCount: 5,
							isActive: false
						},
						{
							id: "3",
							title: "Conversation 3",
							description: "This conversation is Closed",
							timePassed: 180,
							participantCount: 2
						}
					]);
				}, 3000);
			});
	}

}