export interface settings {
	guild: Number;
	channels: Array<Number>;
	quote: Boolean;
	pings: Array<Number>;
	text: String;
}

export interface ticket {
	guild: Number;
	number: Number;
	creator: Number;
	createdAt: Number;
	closedAt: Number;
}
