export interface Settings {
	Guild: string;
	Moderators: Array<string>;
	LogChannelId: string;
}

export interface Channels {
	Guild: string;
	Channel: string;
	Number: number;
	Quote: boolean;
	Pings: Array<string>;
	Text: string;
}

export interface Tickets {
	Guild: string;
	Channel: string;
	Ticket: string;
	Number: number;
	Message: string;
	Creator: string;
	CreatedAt: number;
	ClosedAt: number;
}
