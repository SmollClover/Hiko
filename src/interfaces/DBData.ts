export interface Settings {
	guild: Number;
	moderators: Array<Number>;
}

export interface Channel {
	guild: Number;
	channel: Number;
	quote: Boolean;
	pings: Array<Number>;
	text: String;
}

export interface Ticket {
	guild: Number;
	channel: Number;
	number: Number;
	message: String;
	creator: Number;
	createdAt: Number;
	closedAt: Number;
}
